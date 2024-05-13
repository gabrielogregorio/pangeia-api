// deve dar para testar localmente integrações

export type Context = {
  file: string;
};

type pageDocsMd = {
  markdown?: string;
  type: 'md' | 'tag';
  subType: 'dev' | 'normal';
  dynamicId: string;
};

export type contentType = pageDocsMd;

export type SchemaType = {
  dynamicId: string;
  tags?: string[];
  handlerName: string;
  errors?: string[];
  title: string;
  originName: string;
  content: contentType[];
};

export type scrappersType = {
  bannedPaths: string[];
  filterFile: string;
  directory: string;
  muteLogsListOfAnalyzedFiles: boolean;
};

export type hierarchyType = {
  tags: string[];
  title: string;
};

export type configBase = {
  scrappers: scrappersType[];
  hierarchy: hierarchyType[];
};
