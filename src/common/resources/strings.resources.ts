export const api = {
  titulo: 'ECM FileSave API',
  descricao: 'API de comunicação com a plataforma Alfresco ECM.',
};

export const arquivos = {
  consulta: 'Consulta arquivo no repositório Alfresco ECM',
  download: 'Efetua download de arquivo no repositório Alfresco ECM',
  inclui: 'Inclui arquivo no repositório Alfresco ECM',
  exclui: 'Exclui arquivo no repositório Alfresco ECM',
};

export const solicitacoes = {
  listaAtivasPorSistema: 'Lista solicitações de inclusão de arquivos ativas por sistema',
  inclui: 'Gera solicitação de inclusão de arquivos',
};

export const batch = {
  transmissaoEcm: 'Transmite arquivos pendentes de envio ao repositório ECM',
  higienizacaoEcm: 'Higieniza conteúdo de arquivos enviados ao repositório ECM',
  exclusaoEcm: 'Remove arquivos em situação de exclusão no repositório ECM',
  execucaoRotinaIniciada: 'Execução de rotina finalizada às {data}',
  execucaoRotinaFinalizada: 'Execução de rotina iniciada às {data}',
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
  dataNaoInformada: 'A data deve ser informada.',
};
