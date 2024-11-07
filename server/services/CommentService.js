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
    const { userId, page, size, postId } = req.query;
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
    if(postId){
        queryOptions.where = {postId}
    }

    const CommentData = await Comment.findAndCountAll(queryOptions);
    const paginatedData = getPagingData(CommentData, page, size);

    const CommentAndLikes = await Promise.all(
        paginatedData.data.map(async (comment) => {
            const CommentLikesCounts = await CommentLike.count({ where: { commentId: comment.id } });
            const likesUsers = await CommentLike.findAll({where:{commentId: comment.id}, include:{
                model: User,
                attributes: {exclude: ["createdBy", "createdAt", "password", "user"]}
            }})
            return { ...comment.toJSON(), likes: {
                noOfLikes: CommentLikesCounts,
                likesUsers: likesUsers
            } }; // Convert Comment instance to JSON object
        })
    );

    return {...paginatedData, data: CommentAndLikes}
}

export const getComment = async (req, res) => {
    const { id } = req.params
    return await Comment.findOne({
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

export const getCommentLikes = async (req, res) => {
    const { id } = req.params
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
