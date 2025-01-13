import db from '../configs/db.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import logger from '../logger.js';
import * as CommentService from '../services/CommentService.js'

export const createComment = async (req, res) => {
  try {
    req.body.userId = req.user.id
    const comment = await CommentService.createComment(req, res);
    logger.info('Comment created')
    return res.status(201).json({ message: "User Comment created" });
  } catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await CommentService.getAllComments(req, res);
    return res.status(200).json({
      data: comments
    });
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await CommentService.getComment(req, res);
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
}

export const updateComment = async (req, res) => {
  try {
    await CommentService.updateComment(req, res);
    logger.info("Comment updated")
    res.json("Comment updated")
  } catch (error) {
    console.log(error.message)
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const success = await CommentService.deleteComment(req.params.id);
    if (success) {
      res.status(204).json();
    } else {
      next(new BadRequestError('Comment not found'));
    }
  } catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
};


export const likeComment = async (req, res) =>{
  const trans = await db.transaction()
  try{
    await CommentService.likeComment(req, res, trans)
    trans.commit()
    res.json({message: "Comment liked"})
  }
  catch (error) {
    console.log(error)
    trans.rollback()
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
}

export const getCommentLikes = async(req, res)=>{
  try{
    const commentLikes = await CommentService.getCommentLikes(req, res)
    return res.json(CommentLikes)
  }
  catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
}


export const deleteCommentLike = async(req, res)=>{
  try{
    await CommentService.deleteCommentLikes(req, res)
    return res.json("Comment disliked")
  }
  catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Internal Server Error"
    })
  }
}