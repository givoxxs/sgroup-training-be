FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g pm2 @babel/register

EXPOSE 3000

CMD ["pm2-runtime", "src/index.js", "--node-args=-r @babel/register", "--name", "index"]
