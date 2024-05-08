// ref.any.abc
// [open link example](ref.docbytest.ui)
// não é preciso seguir a exata ordem e nem informar todo o fluxo de referencias
// alertas serão gerados em caso de colisões de merge de schemas
// names devem ser unicos no seu contexto
// deve dar para testar localmente integrações

export type Context = {
  file: string;
};

type pageDocsMd = {
  markdown?: string;
};

export type contentType = pageDocsMd;

export type SchemaType = {
  dynamicId: string;
  tags?: string[];
  errors?: string[];
  title: string;
  originName: string;
  content: contentType[];
};
