import express from 'express';
import { LogService } from '../services/log';
import { generateId } from '../middlewares/generateId';
import axios from 'axios';
import { SchemaType, hierarchyType } from '../types';
import { BASE_UR_LISTENERS, RUN_COLLECTOR } from '../config/envs';

let lastSchema: { schema: SchemaType[]; hierarchy: hierarchyType[] } = { schema: [], hierarchy: [] };

const TIME_TO_REFRESH_DOCS_IN_MS = 1000;

if (RUN_COLLECTOR) {
  setInterval(async () => {
    try {
      const url = BASE_UR_LISTENERS + '/schema';

      const result = await axios.get(url);
      const response = result.data as { schema: SchemaType[]; hierarchy: hierarchyType[] };

      const schemaFixed: SchemaType[] = response.schema.map((schema) => {
        return {
          ...schema,
          blocks: schema.blocks.map((block) => {
            return {
              ...block,
              dynamicId: Math.random().toString()
            };
          }),
          id: generateId(schema).value
        };
      });

      lastSchema = {
        schema: schemaFixed,
        hierarchy: response.hierarchy
      };

      LogService.info('dados obtidos');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return;
      }
      console.error(error);
    }
  }, TIME_TO_REFRESH_DOCS_IN_MS);
}
export const schemaRouter = express.Router();

schemaRouter.get('/', (req, res) => res.json(lastSchema));
schemaRouter.get('/tags', (req, res) => {
  const tags: string[][] = [];
  lastSchema.schema.forEach((item) => {
    if (item.tags?.length) {
      tags.push(item.tags);
    }
  });

  res.json(tags);
});
