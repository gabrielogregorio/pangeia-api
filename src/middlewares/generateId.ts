import crypto from 'crypto';
import { SchemaType } from '../types';

export const generateId = (input: SchemaType) => {
  if (input.title && input.tags?.length) {
    const raw = JSON.stringify(input.tags.join('.') + '.' + input.title);
    const id = crypto.createHash('md5').update(raw).digest('hex');

    return {
      value: id,
      origin: 'tagsAndTitle'
    };
  }

  const bodyGenerate = input.content.map((item) => item.markdown).join('.');
  if (!bodyGenerate && !input.title) {
    const id = crypto.createHash('md5').update(Math.random().toString()).digest('hex');

    return {
      value: id,
      origin: 'dynamicId'
    };
  }

  const content = input?.tags?.join('.') + '.' + input.title + '.' + bodyGenerate;
  const id = crypto.createHash('md5').update(content).digest('hex');

  return {
    value: id,
    origin: 'allAndBody'
  };
};
