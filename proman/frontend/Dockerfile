FROM node:alpine3.18
WORKDIR /frontend
COPY /package.json /package-lock.json ./
RUN npm install
COPY ./ /frontend
RUN npm run build
CMD npm run start
EXPOSE 3000

