import { SchemaType } from '../types';
import { dynamicSchemaResolutionFull } from './dynamicSchemaResolutionFull';

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

describe('dynamicSchemaResolutionFull', () => {
  it('should returns last path founded, and ignoring last', () => {
    let example: SchemaType = {
      name: 'earth',
      page: [
        {
          name: 'page internal'
        }
      ]
    };

    const result = dynamicSchemaResolutionFull(schema, 'earth', example);
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
                name: 'earth',
                page: [
                  {
                    name: 'page internal'
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
    const pathBlock = 'tec';
    let example: SchemaType = {
      name: pathBlock,
      page: [
        {
          name: 'page internal'
        }
      ]
    };

    const result = dynamicSchemaResolutionFull(schema, pathBlock, example);
    expect(result).toStrictEqual([
      {
        name: 'starlab'
      },
      {
        name: 'combratec',
        children: [
          example,
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
    ]);
  });

  it('should returns last path founded, and ignoring last', () => {
    const schemaExample: SchemaType[] = [
      {
        name: 'tec',
        children: [
          {
            name: 'internal'
          }
        ]
      }
    ];
    let example: SchemaType = {
      name: 'internal',
      children: [
        {
          name: 'example'
        }
      ]
    };

    const result = dynamicSchemaResolutionFull(schemaExample, 'internal', example);
    expect(result).toStrictEqual([
      {
        name: 'tec',
        children: [
          {
            name: 'internal',
            children: [
              {
                name: 'example'
              }
            ]
          }
        ]
      }
    ]);
  });

  it('should returns last path founded, and ignoring last', () => {
    const schemaExample: SchemaType[] = [
      {
        name: 'tec',
        children: [
          {
            name: 'internal',
            children: [
              {
                name: 'other'
              },
              {
                name: 'this'
              }
            ]
          }
        ]
      }
    ];
    let example: SchemaType = {
      name: 'this',
      children: [
        {
          name: 'example'
        }
      ]
    };

    const result = dynamicSchemaResolutionFull(schemaExample, 'this', example);
    expect(result).toStrictEqual([
      {
        name: 'tec',
        children: [
          {
            name: 'internal',
            children: [
              {
                name: 'other'
              },
              {
                name: 'this',
                children: [
                  {
                    name: 'example'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]);
  });
});
