import { CommentController } from '../controller/comments';
import { CommentRepository } from '../repository/comments';
import { CommentService } from '../service/comment';

export class DependencyInjector {
  private static commentControllerInstance: CommentController;

  private static commentServiceInstance: CommentService;

  private static commentRepositoryInstance: CommentRepository;

  static get commentController(): CommentController {
    if (!this.commentControllerInstance) {
      this.commentControllerInstance = new CommentController(this.commentService);
    }
    return this.commentControllerInstance;
  }

  private static get commentService(): CommentService {
    if (!this.commentServiceInstance) {
      this.commentServiceInstance = new CommentService(this.commentRepository);
    }
    return this.commentServiceInstance;
  }

  static get commentRepository(): CommentRepository {
    if (!this.commentRepositoryInstance) {
      this.commentRepositoryInstance = new CommentRepository();
    }

    return this.commentRepositoryInstance;
  }
}
