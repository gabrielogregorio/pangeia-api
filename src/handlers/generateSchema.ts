import { SchemaType } from '../types';
import { dynamicSchemaResolutionFull } from './dynamicSchemaResolutionFull';
import { dynamicSchemaResolutionNames } from './dynamicSchemaResolutionNames';

export type inputSchemasType = {
  fullcontext: string;
  base: SchemaType;
};

export const generateSchema = (inputSchemas: inputSchemasType[]) => {
  let schema: SchemaType[] = [];

  inputSchemas.forEach((inputSchema) => {
    let contexts = inputSchema.fullcontext.split('.');
    const nameLastContext = contexts[contexts.length - 1];

    schema = dynamicSchemaResolutionNames(schema, contexts);
    schema = dynamicSchemaResolutionFull(schema, nameLastContext, inputSchema.base);
  });

  return schema;
};
