# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

RUN npm install react-scripts@5.0.0 -g


EXPOSE 3000
EXPOSE 8080
EXPOSE 8888

# add app
COPY . ./

# start app
CMD ["npm", "start"]