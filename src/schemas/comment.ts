import Joi from 'joi';
import { ICreateComments } from '../models/comments';

export const createCommentBodySchema = Joi.object<ICreateComments, true>().keys({
  message: Joi.string().required(),
  postId: Joi.string().required()
});

export const getByIdParamSchema = Joi.object<Omit<ICreateComments, 'message'>, true>().keys({
  postId: Joi.string().required()
});

export const updateCommentBodySchema = Joi.object<ICreateComments, true>().keys({
  message: Joi.string().required(),
  postId: Joi.string().required()
});

export const updateCommentParamSchema = Joi.object<{ commentId: string }, true>().keys({
  commentId: Joi.string().required()
});

export const deleteCommentParamSchema = Joi.object<{ commentId: string }, true>().keys({
  commentId: Joi.string().required()
});
