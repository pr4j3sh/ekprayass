FROM node:20.1.0
ENV DOCKER_BUILDKIT=1
ENV NODE_ENV=$DEPLOYMENT
ENV NODE_OPTIONS=--max_old_space_size=1536


WORKDIR /app

COPY package.json package.json
RUN npm install
COPY . .
CMD ["sh", "-c", "node index.js"]