# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /ErpFrontend/

# add `/ErpFrontend/node_modules/.bin` to $PATH
ENV PATH /ErpFrontend/node_modules/.bin:$PATH
# Exposing my container volume:
VOLUME /ErpFrontend/
# Expose port 
EXPOSE 3000

# install and cache app dependencies
COPY package.json /ErpFrontend/package.json
RUN npm install 
RUN npm install react-scripts@3.0.1 -g 

# start app

ENTRYPOINT [ "npm", "start" ]