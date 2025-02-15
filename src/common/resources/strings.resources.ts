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
  consulta: 'Consulta solicitações de inclusão de arquivos',
  qrcode: 'Gera QR Code para inclusão de arquivos de uma solicitação',
  listaAtivasPorSistema:
    'Lista solicitações de inclusão de arquivos ativas por sistema',
  inclui: 'Gera solicitação de inclusão de arquivos',
};

export const batch = {
  transmissaoEcm: 'Transmite arquivos pendentes de envio ao repositório ECM',
  higienizacaoEcm: 'Higieniza conteúdo de arquivos enviados ao repositório ECM',
  exclusaoEcm: 'Remove arquivos em situação de exclusão no repositório ECM',
  cargaSolicitacao: 'Processa carga de solicitações de arquivos para teste',
  expiracaoSolicitacao:
    'Remove solicitações de arquivos com data de expiração ultrapassada',
  execucaoRotinaIniciada: 'Execução de rotina finalizada às {data}',
  execucaoRotinaFinalizada: 'Execução de rotina iniciada às {data}',
};

export const web = {
  consultaSolicitacao:
    'Consulta uma solicitação aberta para inclusão de arquivos',
  incluiArquivosSolicitacao: 'Inclui arquivos em uma solicitação aberta',
};
