# ECM FileSave API

<img src="/resources/images/logo.png" width="300" height="300" alt="ECM FileSave">

> O foco do projeto é realizar a comunicação com a plataforma Alfresco ECM, descentralizando o armazenamento de documentos de uma base de dados padrão e utilizando um PaaS para gerenciamento de um ecossistema empresarial em nuvem.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e alguns dos grandes tópicos a serem desenvolvidos são:

- [x] Permissionamento com Auth0
- [x] Gerenciamento de arquivos
- [x] Gerenciamento de solicitações
- [x] Rotinas batch de inclusão de arquivos
- [x] Rotinas batch de higienização de arquivos e solicitações 
- [ ] Gerenciamento de organizações
- [ ] Gerenciamento de sistemas
- [ ] Estruturação de diretórios no ECM por organização

## ☕ Pré-Requisitos e Instruções de Uso

- Possuir um usuário válido no Alfresco ECM com Client ID e Client Secret para integrações [a versão Community do serviço pode ser encontrada em ](https://docs.alfresco.com/content-services/community/install/containers/).
- Acessar a URL `/api/docs` quando a aplicação estiver disponibilizada em algum servidor
- Criar um usuário a partir da autenticaçã com Auth0
- Entrar em contato solicitando permissão de acesso para simulação da integração

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
