import { SchemaType } from '../types';
import { dynamicSchemaResolutionNames } from './dynamicSchemaResolutionNames';

const schema: SchemaType[] = [
  {
    name: 'starlab'
  },
  {
    name: 'combratec',
    children: [
      {
        name: 'tec'
      },
      {
        name: 'onboarding',
        children: [
          {
            name: 'earth'
          }
        ]
      }
    ]
  }
];

describe('', () => {
  it('should returns last path founded, and ignoring last', () => {
    const path = ['combratec', 'onboarding', 'space', 'earth'];
    const result = dynamicSchemaResolutionNames(schema, path);

    expect(result).toStrictEqual([
      {
        name: 'starlab'
      },
      {
        name: 'combratec',
        children: [
          {
            name: 'tec'
          },
          {
            name: 'onboarding',
            children: [
              {
                name: 'space',
                children: [
                  {
                    name: 'earth'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
  });

  it('should returns last path founded, and ignoring last', () => {
    const path = ['combratec', 'onboarding', 'space', 'atmosphere', 'earth'];
    const result = dynamicSchemaResolutionNames(schema, path);

    expect(result).toStrictEqual([
      {
        name: 'starlab'
      },
      {
        name: 'combratec',
        children: [
          {
            name: 'tec'
          },
          {
            name: 'onboarding',
            children: [
              {
                name: 'space',
                children: [
                  {
                    name: 'atmosphere',
                    children: [
                      {
                        name: 'earth'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
  });

  it('should add "space" and "atmosfere" mapping', () => {
    const path = ['combratec', 'onboarding', 'space', 'atmosphere', 'earth'];
    const result = dynamicSchemaResolutionNames(schema, path);

    expect(result).toStrictEqual([
      {
        name: 'starlab'
      },
      {
        name: 'combratec',
        children: [
          {
            name: 'tec'
          },
          {
            name: 'onboarding',
            children: [
              {
                name: 'space',
                children: [
                  {
                    name: 'atmosphere',
                    children: [
                      {
                        name: 'earth'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
  });

  it('should map dynamic starting by empty schema', () => {
    const path = ['combratec', 'onboarding', 'space'];
    const result = dynamicSchemaResolutionNames([], path);

    expect(result).toStrictEqual([
      {
        name: 'combratec',
        children: [
          {
            name: 'onboarding',
            children: [
              {
                name: 'space'
              }
            ]
          }
        ]
      }
    ]);
  });

  it('should map dynamic starting by search undefined', () => {
    const path = ['combratec', 'onboarding', 'space'];
    const result = dynamicSchemaResolutionNames(
      [
        {
          name: 'starlab'
        }
      ],
      path
    );

    expect(result).toStrictEqual([
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
                name: 'space'
              }
            ]
          }
        ]
      }
    ]);
  });

  it('example 2', () => {
    const path = ['combratec', 'bff'];
    const result = dynamicSchemaResolutionNames(
      [
        {
          name: 'combratec',
          children: [
            {
              name: 'issoTemQueFicar'
            }
          ]
        }
      ],
      path
    );

    expect(result).toStrictEqual([
      {
        name: 'combratec',
        children: [
          {
            name: 'issoTemQueFicar'
          },
          {
            name: 'bff'
          }
        ]
      }
    ]);
  });
});
