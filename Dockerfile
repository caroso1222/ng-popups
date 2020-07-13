### STAGE 1: Build ###

FROM node:12-alpine as builder

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy npm package files
COPY package*.json ./

# Install npm dependencies
RUN npm set progress=false && npm i --silent

# Copy app files to out container
COPY . .

ARG NODE_OPTIONS=--max_old_space_size=4096

# Build lib
RUN $(npm bin)/ng build --prod ng-popups

# Build app
RUN $(npm bin)/ng build --prod ng-popups-demo

### STAGE 2: Setup ###

FROM nginx:1.12-alpine

# Copy build files from first image to nginx dir
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist/ng-popups-demo /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]