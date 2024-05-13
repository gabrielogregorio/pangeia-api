require('dotenv').config();
import express from 'express';
import { useCors } from './middlewares/useCors';
import { useHandleErrors } from './middlewares/useHandleErrors';
import axios from 'axios';
import { SchemaType, hierarchyType } from './types';
import { LogService } from './services/log';

const app = express();
app.disable('x-powered-by');

app.use(useCors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let lastSchema: { schema: SchemaType[]; hierarchy: hierarchyType[] } = { schema: [], hierarchy: [] };
let status = {
  generateSchema: false,
  error: false
};
const TIME_TO_REFRESH_DOCS_IN_MS = 1000;

// fixme and create report errros
setInterval(async () => {
  try {
    const url = process.env.BASE_UR_LISTENERS?.toString() + '/schema';

    const result = await axios.get(url);
    const response = result.data as { schema: SchemaType[]; hierarchy: hierarchyType[] };

    const schemaFixed = response.schema.map((item) => {
      return {
        ...item,
        content: item.content.map((item) => {
          return {
            ...item,
            dynamicId: Math.random().toString()
          };
        }),
        dynamicId: Math.random().toString()
      };
    });

    lastSchema = {
      schema: schemaFixed,
      hierarchy: response.hierarchy
    };
    status.generateSchema = true;

    LogService.info('dados obtidos');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }
    console.error(error);
  }
}, TIME_TO_REFRESH_DOCS_IN_MS);

app.get('/', (req, res) => {
  return res.sendStatus(200);
});

app.get('/schema', (req, res) => {
  return res.json(lastSchema);
});

app.get('/status', (req, res) => {
  return res.json(status);
});

app.use(useHandleErrors);

app.listen(process.env.PORT);
