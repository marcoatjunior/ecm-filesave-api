export const api = {
  titulo: 'ECM FileSave API',
  descricao: 'API de comunicação com a plataforma Alfresco ECM.',
};

export const excecoes = {
  tokenInvalido:
    'JWT não possui o escopo obrigatório (`openid profile email`).',
  naoAutenticado: 'O usuário deve estar autenticado para realizar esta ação.',
  semAutorizacao: 'Usuário não possui autorização de acesso ao sistema.',
  semPermissao: 'Usuário não possui autorização para a ação.',
};
