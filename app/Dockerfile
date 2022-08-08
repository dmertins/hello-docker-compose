FROM node:18.7-alpine

ENV WAIT_FOR_VERSION=v2.2.3
RUN wget https://github.com/eficode/wait-for/releases/download/${WAIT_FOR_VERSION}/wait-for && \
    chmod o+x wait-for

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY app.js ./

CMD [ "node", "app.js" ]
