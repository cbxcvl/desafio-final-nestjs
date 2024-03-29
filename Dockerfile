FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx generate

RUN npx prisma migrate dev

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
