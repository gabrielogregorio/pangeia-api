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

type codeWithoutLanguageType = {
  type: 'code-without-language';
  file: string;
  code: string[];
};

type warningType = codeWithoutLanguageType;

export type SchemaType = {
  id: string;
  tags?: string[];
  handlerName: string;
  errors?: string[];
  warning?: warningType[];
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
