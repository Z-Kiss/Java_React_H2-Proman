# Stage 1: Build the React frontend
FROM node:14-alpine as frontend
WORKDIR /frontend
COPY /package.json /package-lock.json ./
RUN npm install
COPY ./ /frontend
RUN npm run build
CMD npm run start
EXPOSE 3000

