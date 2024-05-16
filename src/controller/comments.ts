import { Request, Response } from 'express';
import { CommentService } from '../service/comment';
import { ICreateComments, IDatabaComments } from '../models/comments';
import mongoose from 'mongoose';

export class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  create = async (req: Request<undefined, undefined, ICreateComments>, res: Response<IDatabaComments>) => {
    const { postId, message } = req.body;

    const comment = await this.commentService.create({
      postId: postId,
      message
    });

    return res.status(201).json(comment);
  };

  getAll = async (_req: Request, res: Response<IDatabaComments[]>): Promise<Response> => {
    const comments = await this.commentService.findAll();

    return res.json(comments);
  };

  getByPostId = async (req: Request<{ postId: string }, undefined, undefined>, res: Response<IDatabaComments[]>): Promise<Response> => {
    const comments = await this.commentService.findAllByPostId(req.params.postId);

    return res.json(comments);
  };

  updateById = async (
    req: Request<{ commentId: string }, undefined, ICreateComments>,
    res: Response< IDatabaComments>
  ): Promise<Response> => {
    const commentId = req.params.commentId;

    const commentUpdated = await this.commentService.updateById(commentId, req.body);

    return res.json(commentUpdated);
  };

  delete = async (req: Request<{ commentId: string }, undefined, undefined>, res: Response): Promise<Response> => {
    const commentId = req.params.commentId;

    await this.commentService.deleteById(commentId);

    return res.sendStatus(204);
  };
}
