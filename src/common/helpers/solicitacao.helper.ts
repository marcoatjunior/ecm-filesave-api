import { faker } from '@faker-js/faker/.';
import {
  SolicitacaoArquivoEntity,
  SolicitacaoEntity,
} from 'src/solicitacoes/entities';
import { BaseEntity, InformacoesEntity } from '../entities';

export const criaSolicitacao = (): SolicitacaoEntity => ({
  id: faker.string.uuid(),
  organizacao: 'Universidade',
  sistema: 'RH',
  dataHoraExpiracao: new Date('2024-12-28'),
  arquivos: [criaSolicitacaoArquivo()],
  ...criaDadosControle(),
});

export const criaSolicitacaoArquivo = (): SolicitacaoArquivoEntity => ({
  id: faker.string.uuid(),
  informacoes: criaInformacoes(),
  ...criaDadosControle(),
});

export const criaDadosControle = (): BaseEntity => ({
  usuarioCriacao: 'usuario-teste',
  dataHoraCriacao: faker.date.anytime(),
  usuarioAtualizacao: 'usuario-teste',
  dataHoraAtualizacao: faker.date.anytime(),
});

export const criaInformacoes = (): InformacoesEntity => ({
  nome: faker.lorem.word(),
  tipo: faker.system.fileType(),
});
