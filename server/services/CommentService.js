import { BadRequestError } from "../errors/BadRequestError.js"
import { DuplicateError } from "../errors/DuplicateError.js"
import Comment from "../models/Comment.js"
import CommentLike from "../models/CommentLike.js"
import User from "../models/User.js"
import { getPagination, getPagingData } from "../utils/pagination.js"

export const createComment = async (req, res) => {
    const { content, postId } = req.body
    const userId = req.user.id
    await Comment.create({
        userId, content, postId
    })
}

export const updateComment = async (req, res) => {
    const { content } = req.body
    const userId = req.user.id
    const existingComment = await Comment.findOne({ where: { id: req.params.id } })
    if (!existingComment) {
        throw new BadRequestError("Failed to update Comment: Comment must be added before it can be updated")
    }
    await Comment.update({
        content
    }, {
        where: {
            id: req.params.id
        }
    })
}

export const getAllComments = async (req, res) => {
    const { userId, page, size, postId, parentId } = req.query;
    const { limit, offset } = getPagination(page, size);

    let queryOptions = {
        limit,
        offset,
        include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        }
    };

    if (userId) {
        queryOptions.where = { userId: userId };
    }
    if (postId) {
        queryOptions.where = { postId }
    }

    const comments = await buildCommentTree(queryOptions.where.postId, parentId, null)

    const commentsWithLikes = await getNestedCommentLikes(comments)
    const parsedCommentData = await Promise.all(commentsWithLikes.map(async (comment) => {
        return await JSON.parse(JSON.stringify(comment));
    }));
    return parsedCommentData
}

async function getNestedCommentLikes(comments) {
    return await Promise.all(
        comments.data.map(async (comment) => {
            const CommentLikesCounts = await CommentLike.count({ where: { commentId: comment.id } });
            const likesUsers = await CommentLike.findAll({
                where: { commentId: comment.id },
                include: {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ["createdBy", "createdAt", "password", "user", "updatedAt", "updatedBy"] },
                },
            });

            const childrenWithLikes = comment.toJSON().children
                ? await getNestedCommentLikes(comment.toJSON().children) 
                : []; 

            const childrenWithLikesAndLikes = childrenWithLikes.map(async (child) => {
                const CommentLikesCounts = await CommentLike.count({ where: { commentId: child.id } });
                const likesUsers = await CommentLike.findAll({
                    where: { commentId: child.id },
                    include: {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ["createdBy", "createdAt", "password", "user", "updatedAt", "updatedBy"] },
                    },
                });

                return {
                    ...child, 
                    likes: {
                        noOfLikes: CommentLikesCounts,
                        likesUsers: likesUsers.map((user) => user.toJSON()),
                    },
                };
            });

            const processedChildren = await Promise.all(childrenWithLikesAndLikes); 
            return {
                ...comment.toJSON(),
                likes: {
                    noOfLikes: CommentLikesCounts,
                    likesUsers: likesUsers.map((user) => user.toJSON()), 
                },
                children: {
                    total: comment.toJSON().children?.total || 0,
                    data: processedChildren, 
                },
            };
        })
    );
}



export const getComment = async (req, res) => {
    const { id } = req.params
    const comment = await Comment.findOne({
        where: {
            id
        },
        include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        },
        include: {
            model: Comment
        }
    })

    return comment
}

export const likeComment = async (req, res) => {
    const { id } = req.params
    const Comment = getComment(req, res)
    if (!Comment) {
        throw new NotFoundError(`Comment not found ${id}`)
    }
    const existingLike = await CommentLike.findOne({ CommentId: id, userId: req.user.id })
    if (existingLike) {
        return
    }
    await CommentLike.create({
        userId: req.user.id,
        CommentId: id
    })
}

export const getCommentLikes = async (id) => {
    const likes = await CommentLike.findAll({
        where: { CommentId: id }, include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        }
    })
    return likes
}

export const deleteCommentLikes = async (req, res) => {
    const { id } = req.params
    await CommentLike.destroy({
        where: { CommentId: id }
    })
}

async function buildCommentTree(postId, parentId = 0) {
    try {
        const { rows: comments, count: total } = await Comment.findAndCountAll({
            where: { postId, parentId },
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'userName', 'profileAvatar']
                }
            ]
        });
        for (const comment of comments) {
            comment.dataValues.children = await buildCommentTree(postId, comment.id);
        }

        return { total, data: comments };
    } catch (error) {
        console.error('Error building comment tree:', error);
        throw error;
    }
}

