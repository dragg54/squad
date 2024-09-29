import { BadRequestError } from "../errors/BadRequestError.js"
import { DuplicateError } from "../errors/DuplicateError.js"
import Post from "../models/Post.js"
import PostLike from "../models/PostLike.js"
import User from "../models/User.js"
import { getPagination, getPagingData } from "../utils/pagination.js"

export const createPost = async (req, res) => {
    const { title, description } = req.body
    const userId = req.user.id
    await Post.create({
        userId, title, description
    })
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
        include: {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] }
        }
    };

    if (userId) {
        queryOptions.where = { userId: userId };
    }

    const postData = await Post.findAndCountAll(queryOptions);
    const paginatedData = getPagingData(postData, page, size);

    const postAndLikes = await Promise.all(
        paginatedData.data.map(async (post) => {
            const postLikesCounts = await PostLike.count({ where: { postId: post.id } });
            const likesUsers = await PostLike.findAll({where:{postId: post.id}, include:{
                model: User,
                attributes: {exclude: ["createdBy", "createdAt", "password", "user"]}
            }})
            return { ...post.toJSON(), likes: {
                noOfLikes: postLikesCounts,
                likesUsers: likesUsers
            } }; // Convert post instance to JSON object
        })
    );

    return {...paginatedData, data: postAndLikes}
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
        }
    })
}

export const likePost = async (req, res) => {
    const { id } = req.params
    const post = getPost(req, res)
    if (!post) {
        throw new NotFoundError(`Post not found ${id}`)
    }
    const existingLike = await PostLike.findOne({ postId: id, userId: req.user.id })
    if (existingLike) {
        throw new DuplicateError("Post already liked by user")
    }
    await PostLike.create({
        userId: req.user.id,
        postId: id
    })
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
