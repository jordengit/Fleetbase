# ---- Build Stage ----
FROM node:16.20-alpine AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Create the pnpm directory and set the PNPM_HOME environment variable
RUN mkdir -p ~/.pnpm
ENV PNPM_HOME /root/.pnpm

# Add the pnpm global bin to the PATH
ENV PATH /root/.pnpm/bin:$PATH

# Copy pnpm-lock.yaml (or package.json) into the directory /app in the container
COPY console/package.json console/pnpm-lock.yaml ./

# Copy over .npmrc if applicable
COPY console/.npmr[c] ./

# Install global dependencies
RUN npm install -g ember-cli pnpm

# Install git
RUN apk update && apk add git openssh-client

# Trust GitHub's RSA host key
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Copy and install dependencies for fleetops
COPY console/packages/fleetops/package.json console/packages/fleetops/pnpm-lock.yaml ./packages/fleetops/
RUN cd packages/fleetops && pnpm install

# Copy and install dependencies for ember-ui
COPY console/packages/ember-ui/package.json console/packages/ember-ui/pnpm-lock.yaml ./packages/ember-ui/
RUN cd packages/ember-ui && pnpm install

# Copy and install dependencies for ember-core
COPY console/packages/ember-core/package.json console/packages/ember-core/pnpm-lock.yaml ./packages/ember-core/
RUN cd packages/ember-core && pnpm install

# Copy and install dependencies for fleetops-data
COPY console/packages/fleetops-data/package.json console/packages/fleetops-data/pnpm-lock.yaml ./packages/fleetops-data/
RUN cd packages/fleetops-data && pnpm install

# Copy and install dependencies for dev-engine
COPY console/packages/dev-engine/package.json console/packages/dev-engine/pnpm-lock.yaml ./packages/dev-engine/
RUN cd packages/dev-engine && pnpm install

# Install app dependencies
RUN pnpm install

# Copy the console directory contents into the container at /app
COPY console .

# Build the application
RUN pnpm build

# ---- Serve Stage ----
FROM nginx:alpine

# Copy the built app to our served directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port nginx is bound to
EXPOSE 4200

# Use custom nginx.conf
COPY console/nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
