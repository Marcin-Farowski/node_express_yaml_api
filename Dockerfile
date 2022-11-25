FROM node:16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

ADD ["automation users", "automation users/"]
ADD src src/
COPY jest.config.js .
COPY tsconfig.json .

RUN pwd
RUN pwd
RUN ls -la
RUN npm install -g typescript

RUN tsc -p tsconfig.json

EXPOSE 5000

CMD ["npm", "start"]

#CMD ["npm", "run", "dev"]
