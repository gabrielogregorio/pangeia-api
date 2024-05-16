import express from 'express';
import { DependencyInjector } from '../container';
import { useValidation } from '../middlewares/useValidate';

import {
  createCommentBodySchema,
  deleteCommentParamSchema,
  getByIdParamSchema,
  updateCommentBodySchema,
  updateCommentParamSchema
} from '../schemas/comment';

export const commentRouter = express.Router();

const { commentController } = DependencyInjector;

commentRouter.post('/', useValidation({ body: createCommentBodySchema }), commentController.create);
commentRouter.get('/', commentController.getAll);
commentRouter.get('/posts/:postId', useValidation({ params: getByIdParamSchema }), commentController.getByPostId); // to future /posts/${referencePayloadCompleted.postId}/comments
commentRouter.put(
  '/:commentId',
  useValidation({ body: updateCommentBodySchema, params: updateCommentParamSchema }),
  commentController.updateById
);
commentRouter.delete('/:commentId', useValidation({ params: deleteCommentParamSchema }), commentController.delete);
