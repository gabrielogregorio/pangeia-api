import { CustomError } from '../error';
import { ICreateComments, IDatabaComments } from '../models/comments';
import { CommentRepository } from '../repository/comments';

export class CommentService {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  create = async (suggestion: ICreateComments): Promise<IDatabaComments> => {
    return this.commentRepository.create(suggestion);
  };

  findAll = async (): Promise<IDatabaComments[]> => this.commentRepository.findAll();

  findAllByPostId = async (postId: string): Promise<IDatabaComments[]> => this.commentRepository.findAllByPostId(postId);

  updateById = async (id: string, payload: ICreateComments): Promise<IDatabaComments> => {
    console.log(payload);
    const postUpdated = await this.commentRepository.updateById(id, payload);
    if (postUpdated === null) {
      throw new CustomError('comentário não existe', 404);
    }

    return postUpdated;
  };

  deleteById = async (id: string) => {
    const result = await this.commentRepository.deleteById(id);
    if (result === null) {
      throw new CustomError('comentário não existe', 404);
    }

    return {};
  };
}
