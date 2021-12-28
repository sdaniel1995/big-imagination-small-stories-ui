FROM node:14.17-alpine3.14
WORKDIR /app
EXPOSE 3000
ENV PORT 3000
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
CMD [ "npm", "start"]