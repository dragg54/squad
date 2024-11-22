import { activityPoints } from "../constants/ActivityPoints.js"
import { notificationType } from "../constants/NotificationConstants.js"
import { BadRequestError } from "../errors/BadRequestError.js"
import { DuplicateError } from "../errors/DuplicateError.js"
import Comment from "../models/Comment.js"
import Point from "../models/Point.js"
import Post from "../models/Post.js"
import PostLike from "../models/PostLike.js"
import User from "../models/User.js"
import { getPagination, getPagingData } from "../utils/pagination.js"
import { createNotification } from "./NotificationService.js"
import { addPoint, updatePoint } from "./PointService.js"
import { getSquadById } from "./SquadService.js"
import { getAllUsers } from "./UserService.js"

export const createPost = async (req, res, trans) => {
    const { title, description } = req.body
    const squadId = req.user.squadId
    const userId = req.user.id
    const existingSquad = getSquadById(squadId)
    if (!existingSquad) {
        throw new BadRequestError("Squad must exist before user can be added")
    }
    const squadMembers = await getAllUsers(req)

    squadMembers.forEach(async (member) => {
        if (req.user.id != member.id) {
            const notificationRequest = {
                userId: member.id,
                title: "Notification",
                squadId,
                message: `${req.user.userName} created a post`,
                type: notificationType.INFO,
            };

            await createNotification(notificationRequest, trans)
        }
    })

    await Post.create({
        userId, squadId, title, description
    }, { transaction: trans })

    const addPointRequest = {
        userId,
        squadId,
        points: activityPoints.postCreationPoints
    }

    await addPoint(addPointRequest, trans)

}

export const updatePost = async (req, res) => {
    const { title, description } = req.body
    const userId = req.user.id
    const existingPost = await Post.findOne({ where: { id: req.params.id } })
    if (!existingPost) {
        throw new BadRequestError("Failed to update post: Post must be added before it can be updated")
    }
    await Post.update({
        title, description
    }, {
        where: {
            id: req.params.id
        }
    })
}

export const getAllPosts = async (req, res) => {
    const { userId, page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    let queryOptions = {
        limit,
        offset,
        where: { squadId: req.user.squadId },
        include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        },
        order: [['createdAt', 'DESC']]
    };

    if (userId) {
        queryOptions.where["userId"] = userId;
    }

    const postData = await Post.findAndCountAll(queryOptions);
    const paginatedData = getPagingData(postData, page, size);

    const postAndLikes = await Promise.all(
        paginatedData.data.map(async (post) => {
            const postLikesCounts = await PostLike.count({ where: { postId: post.id } });
            const postCommentCounts = await Comment.count({ where: { postId: post.id } })
            const likesUsers = await PostLike.findAll({
                where: { postId: post.id }, include: {
                    model: User,
                    attributes: { exclude: ["createdBy", "createdAt", "password", "user"] }
                }
            })
            return {
                ...post.toJSON(), likes: {
                    noOfLikes: postLikesCounts,
                    likesUsers: likesUsers,
                }, comments: { noOfComments: postCommentCounts }
            }; // Convert post instance to JSON object
        })
    );

    return { ...paginatedData, data: postAndLikes }
}

export const getPost = async (req, res) => {
    const { id } = req.params
    return await Post.findOne({
        where: {
            id
        },
        include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        },
    })
}

export const likePost = async (req, res, trans) => {
    const { id } = req.params
    const post = await getPost(req, res)
    if (!post) {
        throw new NotFoundError(`Post not found ${id}`)
    }
    const existingLike = await PostLike.findOne({ where: { postId: id, userId: req.user.id } })
    if (existingLike) {
        await PostLike.destroy({
            where: { postId: id, userId: req.user.id }
        })
    }
    else if(!existingLike){
        req.body.userId = req.user.id
        await PostLike.create(req.body, { transaction: trans })
        const notificationRequest = {
            userId: post.userId,
            title: "Notification",
            squadId: req.user.squadId,
            message: `${req.user.userName} liked your post`,
            type: notificationType.INFO
        }
        await createNotification(notificationRequest, trans)
    }
    const addPointRequest = {
        userId: post.userId,
        squadId: req.user.squadId,
        points: activityPoints.postLikedPoints
    }

    await addPoint(addPointRequest, trans)
}

export const getPostLikes = async (req, res) => {
    const { id } = req.params
    const likes = await PostLike.findAll({
        where: { postId: id }, include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        }
    })
    return likes
}

export const deletePostLikes = async (req, res) => {
    const { id } = req.params
    await PostLike.destroy({
        where: { postId: id }
    })
}
