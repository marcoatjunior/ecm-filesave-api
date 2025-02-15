// import * as faker from 'faker';
// import { BaseEntity, InformacoesEntity } from 'src/common/entities';
// import {
//   SolicitacaoArquivoEntity,
//   SolicitacaoEntity,
// } from 'src/solicitacoes/entities';

// export const criaSolicitacoes = (): SolicitacaoEntity => ({
//   id: null,
//   organizacao: 'PUCRS',
//   sistema: faker.company.name(),
//   dataHoraExpiracao: faker.date.soon({ days: 2 }),
//   arquivos: faker.helpers.multiple(criaArquivos() as any, {
//     count: {
//       min: 1,
//       max: 5,
//     },
//   }),
//   ...criaControles(),
// });

// const criaArquivos = (): SolicitacaoArquivoEntity => ({
//   id: null,
//   informacoes: criaInformacoes(),
//   ...criaControles(),
// });

// const criaInformacoes = (): InformacoesEntity => ({
//   nome: faker.word.words(3),
//   tipo: 'PDF',
// });

// export const criaControles = (): BaseEntity => ({
//   usuarioCriacao: 'typeorm-seeder',
//   dataHoraCriacao: new Date(),
//   usuarioAtualizacao: 'typeorm-seeder',
//   dataHoraAtualizacao: new Date(),
// });
