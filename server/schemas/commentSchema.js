import Joi from "joi";

export const commentSchema = Joi.object({
     postId: Joi.number(),
     parentId: Joi.number(),
    //  parentPostId: Joi.number(),
     content: Joi.string()
  });

export const updateCommentSchema = Joi.object({
  id: Joi.number(),
  content: Joi.string()
});