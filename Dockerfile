FROM node:22-alpine

# Configura Workdir
ENV TZ="America/Sao_Paulo"
RUN date
WORKDIR /usr/src/app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia código
COPY . .
COPY ormconfig.ts ./
COPY .env ./

# Build da aplicação
RUN npm run build

# Expõe porta de execução do container
EXPOSE 7000

# Executa start de produção
CMD ["npm", "run", "start:prod"]