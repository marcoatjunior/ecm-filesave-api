export interface WebSolicitacaoArquivo {
  id: string;
  nome: string;
  tipo: string;
  usuarioCriacao: string;
}

export interface WebSolicitacao {
  id: string;
  organizacao: string;
  sistema: string;
  dataHoraExpiracao: Date;
  arquivos: WebSolicitacaoArquivo[];
}

export interface WebArquivo {
  organizacao: string;
  sistema: string;
  nome: string;
  tipo: string;
  numeroBytes: number;
  conteudo: Buffer;
  usuarioCriacao: string;
}