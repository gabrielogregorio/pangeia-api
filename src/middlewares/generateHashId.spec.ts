import { SchemaType } from '../types';
import { generateId } from './generateId';

describe('', () => {
  it('[all infos] should generate id by tags, title, origin name and handler name', () => {
    const payload: SchemaType = {
      id: '',
      tags: ['tag1', 'tag2'],
      handlerName: 'example handler name',
      errors: [],
      warning: [],
      title: 'example title id',
      originName: 'origina name',
      content: [
        {
          dynamicId: '',
          subType: 'dev',
          markdown: 'example',
          type: 'md'
        }
      ]
    };

    const result = generateId(payload);

    expect(result).toEqual({ value: '23ee44b17e0e122092381f10a83777ca', origin: 'tagsAndTitle' });
  });

  it('[title and content is empty] should generate id by dynamic id', () => {
    const payload: SchemaType = {
      id: '',
      tags: ['tag1', 'tag2'],
      handlerName: 'example handler name',
      errors: [],
      warning: [],
      title: '',
      originName: 'origina name',
      content: []
    };

    const result = generateId(payload);

    expect(result).toEqual({ value: expect.anything(), origin: 'dynamicId' });
  });

  it('[title is empty] should generate id by tags, content, origin name and handler name', () => {
    const payload: SchemaType = {
      id: '',
      tags: ['tag1', 'tag2'],
      handlerName: 'example handler name',
      errors: [],
      warning: [],
      title: '',
      originName: 'origina name',
      content: [
        {
          dynamicId: '',
          subType: 'dev',
          markdown: 'example',
          type: 'md'
        }
      ]
    };

    const result = generateId(payload);

    expect(result).toEqual({ origin: 'allAndBody', value: '11acdbdd4b52b57d312e2936b4c669ed' });
  });

  it('[title is empty] should generate id by tags, content, origin name and handler name', () => {
    const payload: SchemaType = {
      id: '',
      tags: ['tag1', 'tag2'],
      handlerName: 'example handler name',
      errors: [],
      warning: [],
      title: '',
      originName: 'origina name',
      content: [
        {
          dynamicId: '',
          subType: 'dev',
          markdown: '',
          type: 'md'
        }
      ]
    };

    const result = generateId(payload);

    expect(result).toEqual({ origin: 'dynamicId', value: expect.anything() });
  });
});
