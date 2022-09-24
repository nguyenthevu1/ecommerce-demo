FROM node:14-slim

# Create app directory
RUN apt update && apt upgrade -y
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 5000

CMD [ "npm", "start" ]