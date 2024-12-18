FROM node:22-alpine AS development

# Configura Workdir
ENV NODE_ENV development
ENV TZ="America/Sao_Paulo"
WORKDIR /usr/src/app

# Configura repositorio
COPY .npmrc ./

# Instala dependências
COPY package.json pm2.json yarn.lock ./
RUN yarn --ignore-engines

# Copia código
COPY src ./src
COPY tsconfig*.json ./

# Build da aplicação
FROM development AS build
ENV NODE_ENV production
RUN yarn build

# Stage de deploy
FROM docker.io/nginxinc/nginx-unprivileged:1.23-alpine AS deploy
ENV NGINX_DIR "/usr/share/nginx/html"

# Configura NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Copia arquivos para deploy
COPY --from=build /usr/src/app/dist ${NGINX_DIR}

# Prepara entrypoint do container
EXPOSE 3000
ENTRYPOINT sh -c "nginx -g \"daemon off;\""

# Configura server name
FROM build AS deployManagement
RUN npm install -g pm2
CMD ["pm2-runtime", "start", "pm2.json"]