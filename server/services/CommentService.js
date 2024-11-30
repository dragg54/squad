import { activityPoints } from "../constants/ActivityPoints.js"
import { notificationSource, notificationType } from "../constants/NotificationConstants.js"
import { BadRequestError } from "../errors/BadRequestError.js"
import { DuplicateError } from "../errors/DuplicateError.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import Comment from "../models/Comment.js"
import CommentLike from "../models/CommentLike.js"
import User from "../models/User.js"
import { getPagination, getPagingData } from "../utils/pagination.js"
import { createNotification } from "./NotificationService.js"
import { addPoint } from "./PointService.js"

export const createComment = async (req, res) => {
    const { content, postId, parentId } = req.body
    const userId = req.user.id
    await Comment.create({
        userId, content, postId, parentId
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



export const getComment = async (req) => {
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
            model: Comment,
            as: 'children',
            attributes: {exclude: ['createdAt', 'updatedAt']}
        }
    })

    return comment
}

export const likeComment = async (req, res, trans) => {
    const { id } = req.params
    const comment = await getComment(req)
    if (!comment) {
        throw new NotFoundError(`Comment not found ${id}`)
    }
    const existingLike = await CommentLike.findOne({ where: { commentId: id, userId: req.user.id }, as: 'comment' })
    if (existingLike) {
        await CommentLike.update({ liked: existingLike.liked ? false : true }, {
            where: { commentId: id, userId: req.user.id }
        })
    }
    else if (!existingLike) {
        req.body.liked = true
        req.body.userId = req.user.id
        const commentLike = await CommentLike.create(req.body, { transaction: trans })
        const notificationRequest = {
            recipientId: comment.userId,
            senderId: req.user.id,
            title: "Notification",
            squadId: req.user.squadId,
            message: `${req.user.userName} liked your comment`,
            type: notificationType.INFO,
            sourceId: comment.id,
            sourceName: notificationSource.POST
        }

        const createNotifications = await createNotification(notificationRequest, trans)
        const addPointRequest = {
            userId: comment.userId,
            squadId: req.user.squadId,
            points: activityPoints.postLikedPoints
        }
    
        await addPoint(addPointRequest, trans)
    }
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

async function buildCommentTree(postId, parentId = null) {
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

