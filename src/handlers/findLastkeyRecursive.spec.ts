import { SchemaType } from '../types';
import { findLastkeyRecursive } from './findLastkeyRecursive';

const schema: SchemaType[] = [
  {
    name: 'starlab'
  },
  {
    name: 'combratec',
    children: [
      {
        name: 'onboarding',
        children: [
          {
            name: 'space',
            children: [
              {
                name: 'mars'
              }
            ]
          },
          {
            name: 'earth'
          }
        ]
      },
      {
        name: 'tec'
      }
    ]
  }
];

describe('', () => {
  it('should returns last path founded, and ignoring last', () => {
    const path = ['combratec', 'space', 'mars', 'moon'];

    const result = findLastkeyRecursive(schema, path);
    expect(result).toEqual({
      index: 2,
      lastPath: 'mars',
      isLast: false,
      nextPath: 'moon',
      pathsRestantes: ['moon'],
      restante: '{"name":"mars"}'
    });
  });

  it('should returns last path founded on last path is founded', () => {
    const path = ['combratec', 'space', 'mars'];

    const result = findLastkeyRecursive(schema, path);
    expect(result).toEqual({
      index: 2,
      lastPath: 'mars',
      isLast: true,
      nextPath: undefined,
      pathsRestantes: [],
      restante: '{"name":"mars"}'
    });
  });

  it('should returns undefined on first path dont exists', () => {
    const path = ['other', 'space'];

    const result = findLastkeyRecursive(schema, path);
    expect(result).toEqual({
      index: -1,
      lastPath: undefined,
      isLast: false,
      nextPath: 'other',

      pathsRestantes: ['other', 'space'],
      restante: ''
    });
  });

  it('should returns "space" path founded', () => {
    const path = ['space'];

    const result = findLastkeyRecursive(schema, path);
    expect(result).toEqual({
      index: 0,
      lastPath: 'space',
      isLast: true,
      nextPath: undefined,
      pathsRestantes: [],
      restante: '{"name":"space","children":[{"name":"mars"}]}'
    });
  });

  it('should returns undefined or not has path', () => {
    const path: string[] = [];

    const result = findLastkeyRecursive(schema, path);
    expect(result).toEqual({
      index: -1,
      lastPath: undefined,
      isLast: true,
      nextPath: undefined,
      pathsRestantes: [],
      restante: ''
    });
  });
});
