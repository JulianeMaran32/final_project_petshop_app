FROM node:20.04

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]