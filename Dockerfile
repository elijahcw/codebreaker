FROM node:21-alpine AS builder
ENV NODE_ENV production PATH /app/node_modules/.bin:$PATH
# Add a work directory
WORKDIR /app
# Copy all the client files
COPY codenames-client/ /app/
# Build the react app deployable build
RUN npm run build

# Bundle static assets with nginx
FROM node:21-alpine
ENV PORT 8080 NODE_ENV production
# Copy the React Build from the previous stage
COPY --from=builder /app/build /codenames-client/build
# Cache and Install dependencies
COPY package.json ./
COPY package-lock.json ./
COPY web.config  ./
COPY server.js  ./
RUN npm ci --silent
# Run the Server
EXPOSE 8080
CMD [ "node", "server.js" ]