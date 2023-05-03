FROM node:18

WORKDIR /app

COPY . .

RUN ls -la /app

RUN npm install --loglevel verbose

RUN npm run migration:generate
RUN npm run init:database
RUN npm run build


CMD ["serverless", "offline"]