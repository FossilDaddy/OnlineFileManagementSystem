#configuration
FROM node:17-alpine as builder
WORKDIR /app
COPY . .
RUN npm install

#build
RUN npm run build

#run
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]