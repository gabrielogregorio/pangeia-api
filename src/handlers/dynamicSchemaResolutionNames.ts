import { CustomError } from '../error';
import { SchemaType } from '../types';
import { findLastkeyRecursive } from './findLastkeyRecursive';
import { insertInside } from './insertInside';

export const dynamicSchemaResolutionNames = (schema: SchemaType[], paths: string[]) => {
  let cacheLastSchema = '';
  let finalSchema = [...schema];
  while (true) {
    const abcc = findLastkeyRecursive(finalSchema, paths);

    if (abcc.isLast) {
      return finalSchema;
    }

    const preservarChildren = abcc.pathsRestantes.some((path) => abcc.restante.includes(`"name":"${path}"`));
    // fixme: names is very bad
    // @ts-ignore
    finalSchema = insertInside(finalSchema, abcc.lastPath, abcc.nextPath, !preservarChildren);

    let schemaResolved = JSON.stringify(cacheLastSchema);

    if (schemaResolved === cacheLastSchema) {
      throw new CustomError(
        `During dynamic path resolution an infinite resolution was found that never changes, this was the entry "${JSON.stringify(
          schema
        )}" with these paths "${JSON.stringify(paths)}" and this was the frozen resolution "${JSON.stringify(
          schemaResolved
        )}". This problem may be a bug in the library, please report it to the project developers or try to change its schema. Sorry!`
      );
    }
    cacheLastSchema = schemaResolved;
  }
};
