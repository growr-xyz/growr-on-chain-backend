FROM mhart/alpine-node:14

RUN mkdir -p /home/app

WORKDIR /home/app

COPY graphql ./graphql
COPY model ./model
COPY index.js .
COPY package.json .
COPY .env .

RUN npm install

EXPOSE 4000

ENTRYPOINT ["node", "index.js"]