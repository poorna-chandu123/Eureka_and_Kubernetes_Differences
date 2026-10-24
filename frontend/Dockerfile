# Run the existing Angular development server inside Docker (no Nginx).
FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4200

# Use the Docker-specific proxy so /api requests reach the Compose Gateway service.
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy.docker.conf.json"]
