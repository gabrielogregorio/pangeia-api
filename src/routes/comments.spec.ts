import { DependencyInjector } from '../container';
import { requestMock } from '../mocks';

const referenceErrorMessageIsRequired = { message: '"message" is required' };
const referenceErrorPostIdIsRequired = { message: '"postId" is required' };
const referencePayloadCompleted = { message: 'example message', postId: 'example post Id' };

describe('Comentários', () => {
  describe('criação', () => {
    it('[doc] - 🚫 impede a criação de comentários sem os parâmetros', async () => {
      const responseExpected = referenceErrorMessageIsRequired;

      const response = await requestMock.post('/comments').send({});

      expect(response.body).toEqual(responseExpected);
      expect(response.statusCode).toEqual(400);
    });

    it('[doc] - 🚫 impede a criação de comentários sem o message', async () => {
      const responseExpected = referenceErrorMessageIsRequired;

      const response = await requestMock.post('/comments').send({ postId: 'example post Id' });

      expect(response.body).toEqual(responseExpected);
      expect(response.statusCode).toEqual(400);
    });

    it('[doc] - 🚫 impede a criação de comentários sem o post id', async () => {
      const responseExpected = referenceErrorPostIdIsRequired;

      const response = await requestMock.post('/comments').send({ message: 'example message' });

      expect(response.body).toEqual(responseExpected);
      expect(response.statusCode).toEqual(400);
    });

    it('[doc] - ✅ cria um comentário', async () => {
      const responseExpected = {
        ...referencePayloadCompleted,
        _id: 'example id' as any,
        createdAt: 'example-created-at',
        updatedAt: 'example-updated-at'
      };

      const spyCreateRepository = jest.spyOn(DependencyInjector.commentRepository, 'create');
      spyCreateRepository.mockImplementation((data) => {
        expect(data).toEqual(referencePayloadCompleted);
        return Promise.resolve(responseExpected);
      });

      const response = await requestMock.post('/comments').send({ message: 'example message', postId: 'example post Id' });

      expect(response.body).toEqual(responseExpected);
      expect(response.statusCode).toEqual(201);
    });
  });

  describe('Retorno de tudo', () => {
    it('[doc] - ✅ retorna todos os comentários', async () => {
      const responseExpected = {
        ...referencePayloadCompleted,
        _id: 'example id' as any,
        createdAt: 'example-created-at',
        updatedAt: 'example-updated-at'
      };

      const spyCreateRepository = jest.spyOn(DependencyInjector.commentRepository, 'findAll');
      spyCreateRepository.mockImplementation(() => {
        return Promise.resolve([responseExpected]);
      });

      const response = await requestMock.get('/comments');

      expect(response.body).toEqual([responseExpected]);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('retorna todos os comnentários pelo id', () => {
    it('[doc] - ✅ should returns comments by postId', async () => {
      const responseExpected = {
        ...referencePayloadCompleted,
        _id: 'example id' as any,
        createdAt: 'example-created-at',
        updatedAt: 'example-updated-at'
      };

      const spyCreateRepository = jest.spyOn(DependencyInjector.commentRepository, 'findAllByPostId');
      spyCreateRepository.mockImplementation((data) => {
        expect(data).toEqual(referencePayloadCompleted.postId);
        return Promise.resolve([responseExpected]);
      });

      const response = await requestMock.get(`/comments/posts/${referencePayloadCompleted.postId}`);

      expect(response.body).toEqual([responseExpected]);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Atualização', () => {
    it('[doc] - ✅ Atualiza um comentário pelo id', async () => {
      const commentId = 'example id' as any;
      const responseExpected = {
        ...{ ...referencePayloadCompleted, postId: undefined },
        _id: commentId,
        createdAt: 'example-created-at',
        updatedAt: 'example-updated-at'
      };

      const spyCreateRepository = jest.spyOn(DependencyInjector.commentRepository, 'updateById');
      spyCreateRepository.mockImplementation((dataCommentId, data) => {
        expect(dataCommentId).toEqual(commentId);
        expect(data).toEqual(referencePayloadCompleted);
        return Promise.resolve(responseExpected);
      });

      const response = await requestMock.put(`/comments/${commentId}`).send({ message: 'example message', postId: 'example post Id' });

      expect(response.body).toEqual(responseExpected);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Remoção', () => {
    it('[doc] - ✅ Remove um comentário pelo id', async () => {
      const commentId = 'example id' as any;
      const responseExpected = {};

      const spyCreateRepository = jest.spyOn(DependencyInjector.commentRepository, 'deleteById');
      spyCreateRepository.mockImplementation((dataCommentId) => {
        expect(dataCommentId).toEqual(commentId);

        return Promise.resolve();
      });

      const response = await requestMock.delete(`/comments/${commentId}`);

      expect(response.body).toEqual(responseExpected);
      expect(response.statusCode).toEqual(204);
    });
  });
});
