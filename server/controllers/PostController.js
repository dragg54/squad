import { BadRequestError } from '../errors/BadRequestError.js';
import * as postService from '../services/PostService.js'

export const createPost = async (req, res) => {
  try {
    req.body.userId = req.user.id
    const post = await postService.createPost(req, res);
    return res.status(201).json({message: "User Post created"});
  } catch (error) {
     console.log(error)
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const Posts = await postService.getAllPosts(req, res);
    return res.status(200).json(Posts);
  } catch (error) {
    console.log(error)
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const updatePost = async (req, res) => {
  try {
    await postService.updatePost(req, res);
    res.json("Post updated")
  } catch (error) {
    console.log(error.message)
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const success = await postService.deletePost(req.params.id);
    if (success) {
      res.status(204).json();
    } else {
      next(new BadRequestError('Post not found'));
    }
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const getPostsByMonth = async (req, res, next) => {
  try {
    const Posts = await postService.getPostsGroupedByMonth(req);
    return res.json(Posts)
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};
