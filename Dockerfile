FROM node:10.15-jessie

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i
RUN npm audit fix

COPY ./dist/ /usr/src/app/dist

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080

ENTRYPOINT [ "sh", "-c", "node dist/express/src/server"]
