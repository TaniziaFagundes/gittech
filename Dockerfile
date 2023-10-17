# Estágio 1: Construir a aplicação React
FROM node:20.8.0-buster AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Exportar a aplicação React como um servidor HTTP
FROM node:20.8.0
WORKDIR /app
COPY --from=build /app/build ./public
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
RUN npm install -g serve
EXPOSE 5000
CMD ["npm", "start", "--port", "$PORT"]

# tive um problema pois o container docker criado não estava copiando os arquivos necessários como o package.json