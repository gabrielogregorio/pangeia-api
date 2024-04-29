import { SchemaType } from 'src/types';

export const findLastkeyRecursive = (schema: SchemaType[], paths: string[]) => {
  let lastPath: string | undefined = undefined;
  let indexCurrentPath = 0;
  let restante = '';

  function findRecursiveIn(schema: SchemaType[], paths: string[]) {
    return schema.map((item) => {
      const currentPath = paths[indexCurrentPath];
      if (!currentPath) {
        return;
      }

      if (item.name && currentPath === item.name) {
        indexCurrentPath += 1;
        lastPath = item.name;
        restante = JSON.stringify(item);
      }

      item.children ? findRecursiveIn(item.children, paths) : lastPath;
    });
  }

  findRecursiveIn(schema, paths);

  // FIXME: names here is bad
  return {
    lastPath,
    nextPath: paths[indexCurrentPath],
    isLast: paths[paths.length - 1] === lastPath,
    index: indexCurrentPath - 1,
    restante,
    pathsRestantes: paths.slice(indexCurrentPath)
  };
};
