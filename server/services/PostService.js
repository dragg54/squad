import { BadRequestError } from "../errors/BadRequestError.js"
import Post from "../models/Post.js"
import User from "../models/User.js"
import { getPagination } from "../utils/pagination.js"

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
    const existingPost = await Post.findOne({where: {id: req.params.id}})
    if(!existingPost){
        throw new BadRequestError("Failed to update post: Post must be added before it can be updated")
    }
    await Post.update({
        title, description
    },{where:{
        id: req.params.id
    }})
}

export const getAllPosts = async (req, res) => {
    const { userId, page, size } = req.query
    const { limit, offset } = getPagination(page, size);
    let queryOptions = {
        limit,
        offset,
        include:{
            model: User,
            attributes: {exclude: ["password", "createdAt", "updatedAt"]}
        }
    };
    if (userId) {
        queryOptions.where = { userId: userId };
    }
    return await Post.findAndCountAll(queryOptions)
}
