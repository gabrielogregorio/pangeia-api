import { Comment, ICreateComments, IDatabaComments } from '../models/comments';

export class CommentRepository {
  create = async (comment: ICreateComments): Promise<IDatabaComments> => {
    const newComment = new Comment(comment);

    await newComment.save();

    return newComment;
  };

  findAll = async (): Promise<IDatabaComments[]> => Comment.find();

  findAllByPostId = async (postId: string): Promise<IDatabaComments[]> => Comment.find({ postId });

  updateById = async (_id: string, { message, postId }: ICreateComments): Promise<IDatabaComments | null> =>
    Comment.findOneAndUpdate({ _id }, { $set: { message, postId } }, { new: true });

  deleteById = async (_id: string): Promise<void | null> => Comment.findOneAndDelete({ _id });
}
