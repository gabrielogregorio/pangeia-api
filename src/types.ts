// deve dar para testar localmente integrações

export type Context = {
  file: string;
};

type pageDocsMd = {
  type: 'md' | 'tag';
  dynamicId: string;
  markdown?: string;
  subType: 'dev' | 'normal';
};

export type handlerRequestType = {
  type: 'request';
  method: string;
  headers: {
    [key: string]: string;
  };
  payload: string;
  url: string;
};

export type blocksType = pageDocsMd | handlerRequestType;

export type requestJsonWithoutHeader = {
  type: 'request-json-without-header';
  file: string;
  code: string[];
};

type codeWithoutLanguageType = {
  type: 'code-without-language';
  file: string;
  code: string[];
};

type warningType = codeWithoutLanguageType | requestJsonWithoutHeader;

export type SchemaType = {
  id: string;
  tags?: string[];
  handlerName: string;
  errors?: string[];
  warning?: warningType[];
  title: string;
  originName: string;
  blocks: blocksType[];
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
