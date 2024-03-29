FROM node:16.3.0-alpine as builder
WORKDIR /app
COPY ./package.json ./

RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]