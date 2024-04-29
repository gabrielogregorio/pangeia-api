import { SchemaType } from '../types';

// fixme: refactor all
// refactor this trash
// refactor this trash
// refactor this trash
// refactor this trash
// refactor this trash
// refactor this trash
export const dynamicSchemaResolutionFull = (schema: SchemaType[], search: string, insert: SchemaType) => {
  const childrenResolved: SchemaType[] = insert.children ? insert.children : [];
  const remapSchema = (schema: SchemaType[]) => {
    return schema.map((item): SchemaType => {
      if (item.children) {
        if (item.name === search) {
          const itemChildrenResolved: SchemaType[] = item.children ? item.children : [];
          const children =
            itemChildrenResolved.length || childrenResolved.length ? { children: [...itemChildrenResolved, ...childrenResolved] } : {};
          return {
            ...item,
            ...insert,
            ...children
          };
        }
        return { ...item, children: remapSchema(item.children) };
      }

      if (item.name === search) {
        const itemChildrenResolved: SchemaType[] = item.children ? item.children : [];
        const children =
          itemChildrenResolved.length || childrenResolved.length ? { children: [...itemChildrenResolved, ...childrenResolved] } : {};
        return {
          ...item,
          ...insert,
          ...children
        };
      }
      return item;
    });
  };

  return remapSchema(schema);
};
