FROM node:20

ENV HOST 0.0.0.0

WORKDIR /node-app

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
