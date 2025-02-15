insert into
  public."ARQUIVO" (
    "ID",
    "ID_ECM",
    "SITUACAO",
    "NOME",
    "NUMERO_BYTES",
    "DATA_HORA_TRANSMISSAO",
    "USUARIO_CRIACAO",
    "DATA_HORA_CRIACAO",
    "USUARIO_ATUALIZACAO",
    "DATA_HORA_ATUALIZACAO"
  )
values
  (
    '3a912481-9a68-42f0-af33-9b0a495cbf07' :: uuid,
    '0ac3637b-e18b-4af5-ae69-92867e147537',
    'P' :: public."ARQUIVO_situacao_enum",
    'GERENCIAMENTO DE DOCUMENTOS COM ALFRESCO ECM',
    744311,
    '2025-02-15 12:08:12.845',
    'auth0|67ad228c86bfadbfd17c6025',
    '2025-02-15 12:07:42.382',
    'auth0|67ad228c86bfadbfd17c6025',
    '2025-02-15 12:08:12.956'
  );