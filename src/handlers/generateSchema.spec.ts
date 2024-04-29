import { generateSchema } from './generateSchema';

const inputSchemas = [
  {
    fullcontext: 'combratec.tech.frontend',
    base: {
      name: 'frontend',
      children: [
        {
          name: 'example2'
        }
      ]
    }
  },
  {
    fullcontext: 'combratec.tech.grupo.frontend.vscode',
    base: {
      name: 'vscode',
      children: [
        {
          name: 'examplevscode'
        }
      ]
    }
  }
];

const expectedSchemaResolved = [
  {
    name: 'combratec',
    children: [
      {
        name: 'tech',
        children: [
          {
            name: 'grupo',
            children: [
              {
                name: 'frontend',
                children: [
                  {
                    name: 'example2'
                  },
                  {
                    name: 'vscode',
                    children: [
                      {
                        name: 'examplevscode'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

describe('should generate schema with complementary models', () => {
  it('generateSchema', () => {
    const finalSchema = generateSchema(inputSchemas);
    expect(finalSchema).toEqual(expectedSchemaResolved);
  });
});
