
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

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
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "public", "-l", "5000"]
