FROM node:16-alpine

RUN apk add --no-cache git

WORKDIR /usr/app

COPY . .

RUN yarn install


RUN yarn build


#EXPOSE ${PORT}

ENTRYPOINT ["yarn", "prod"]