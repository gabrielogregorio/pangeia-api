export type Context = {
  file: string;
};

type pageDocsMd = {
  type: 'md' | 'tag';
  dynamicId: string;
  markdown?: string;
  subType: 'dev' | 'normal';
};

export type swaggerRequestType = {
  type: 'openApi3';
  dynamicId: string;
  summary: string;
  description: string;
  method: string;
  url: string;
  sceneries: {
    summary: string;
    description: string;
    params: { [key: string]: string };
    payload: unknown;
    headers: {
      [key: string]: string;
    };
    response: { status: number; example: unknown };
  }[];
};

export type blocksType = pageDocsMd | swaggerRequestType;

export type requestJsonWithoutHeader = {
  type: 'request-json-without-header';
  file: string;
  code: string[];
};

export type codeWithoutLanguageType = {
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
