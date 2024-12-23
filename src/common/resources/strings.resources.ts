export const api = {
  titulo: 'ECM FileSave API',
  descricao: 'API de comunicação com a plataforma Alfresco ECM.',
};

export const arquivos = {
  consulta: 'Consulta informações de um arquivo no repositório Alfresco ECM',
  download: 'Download de arquivo no repositório Alfresco ECM',
  upload: 'Upload de arquivo no repositório Alfresco ECM',
  exclui: 'Exclui arquivo no repositório Alfresco ECM',
};

export const excecoes = {
  tokenInvalido:
    'JWT não possui o escopo obrigatório (`openid profile email`).',
  naoAutenticado: 'O usuário deve estar autenticado para realizar esta ação.',
  semAutorizacao: 'Usuário não possui autorização de acesso ao sistema.',
  semPermissao: 'Usuário não possui autorização para a ação.',
  erroInterno: 'Erro interno do servidor.',
};

export const validacoes = {
  arquivoNaoSuportado: 'O arquivo selecionado deve estar no formato PDF.',
};
