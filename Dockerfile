FROM node:14-alpine

RUN apk add --no-cache git

WORKDIR /app

RUN rm -rf subdirectory

COPY . ./subdirectory

WORKDIR /app/subdirectory

RUN npm cache clean --force \
    && rm -rf node_modules package-lock.json \
    && npm install \
    && npm run build \
    && npm install -g serve

CMD ["serve", "-s", "build"]

EXPOSE 3000

