FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

RUN mkdir -p build

COPY . .

RUN npm run build-backend

CMD ["npm", "run", "build"]