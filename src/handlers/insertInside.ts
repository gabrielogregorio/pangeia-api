import { SchemaType } from '../types';

// refactor this trash
export const insertInside = (
  schema: SchemaType[],
  search: string | undefined,
  insertx: string | SchemaType,
  preservarChildren: boolean = false
) => {
  const insertMapped: SchemaType = typeof insertx === 'string' ? { name: insertx } : insertx;
  const insertMappedChildren: SchemaType = typeof insertx === 'object' && insertx.children ? { children: insertx.children } : {};
  if (schema.length === 0) {
    return [insertMapped];
  }

  if (search === undefined) {
    return [...schema, insertMapped];
  }

  const remapSchema = (schema: SchemaType[]) => {
    return schema.map((item): SchemaType => {
      if (item.children) {
        if (item.name === search) {
          if (preservarChildren) {
            return {
              ...item,
              children: [
                ...remapSchema(item.children),
                {
                  ...insertMapped,
                  ...insertMappedChildren
                }
              ]
            };
          } else {
            if (preservarChildren) {
              return {
                ...item,
                children: [
                  ...remapSchema(item.children),
                  {
                    ...insertMapped,
                    ...insertMappedChildren
                  }
                ]
              };
            } else {
              const childrenLocal: SchemaType[] = insertMappedChildren.children ? insertMappedChildren.children : [];
              const resultMap = remapSchema(item.children);
              const children = childrenLocal.length || resultMap.length ? { children: [...childrenLocal, ...resultMap] } : {};
              return {
                ...item,
                children: [
                  {
                    ...insertMapped,
                    ...children
                  }
                ]
              };
            }
          }
        }
        return { ...item, children: remapSchema(item.children) };
      }

      if (item.name === search) {
        return {
          ...item,
          children: [
            {
              ...insertMapped,
              ...insertMappedChildren
            }
          ]
        };
      }
      return item;
    });
  };

  return remapSchema(schema);
};
