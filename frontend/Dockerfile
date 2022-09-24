FROM node:14-slim

# Create app directory
RUN apt update && apt upgrade -y
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

RUN npm build
RUN npm install serve -g

EXPOSE 3000
CMD [ "serve", "-s", "build", "-l", "3000" ]