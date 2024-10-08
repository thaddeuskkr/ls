# Nova

![Workflow Status (release)](https://github.com/thaddeuskkr/nova/actions/workflows/build-tags.yml/badge.svg) ![Workflow Status (push)](https://github.com/thaddeuskkr/nova/actions/workflows/build-main.yml/badge.svg)

Nova is a simple link shortener created in TypeScript that runs on Node.js.  
***Currently in development, and not ready for production use.***

## Features

* An API that is easy to use and understand
* User management
* Password-protected short URLs

## Setup: Production

The following are the recommended ways to run Nova.  
Do note, the Docker configurations are the exact same, but with different methods of running them.

### Docker (CLI)

Run the following command directly. Do replace the environment variables (`-e`) and port mapping (`-p`) with a configuration more relevant to you.

```sh
docker run \
  --name nova \
  --restart unless-stopped \
  -p 80:3000 \
  -e MONGODB_CONNECTION_URL="<YOUR_DATABASE_URL>" \
  -e HOST="localhost" \
  -e PORT="3000" \
  -e BASE_URL="" \
  -e BASE_URL_REDIRECT="" \
  -e ALLOWED_HOSTS="" \
  -e PROHIBITED_SLUGS="api" \
  -e PROHIBITED_CHARACTERS_IN_SLUGS="/" \
  -e REGISTRATION_ENABLED="true" \
  -e URL_DELETION_ENABLED="true" \
  -e LOG_LEVEL="info" \
  -e NODE_ENV="production" \
  ghcr.io/thaddeuskkr/ nova:latest
```

### Docker Compose

Create a `compose.yml` file in a empty directory with the following sample content edited to fit your use case. Then, run `docker compose up`.

```yml
services:
  nova:
    container_name: nova
    image: ghcr.io/thaddeuskkr/nova:latest
    restart: unless-stopped
    ports:
      - "80:3000"
    environment:
      MONGODB_CONNECTION_URL: "<YOUR_DATABASE_URL>"
      HOST: "localhost"
      PORT: "3000"
      BASE_URL: ""
      BASE_URL_REDIRECT: ""
      ALLOWED_HOSTS: ""
      PROHIBITED_SLUGS: "api"
      PROHIBITED_CHARACTERS_IN_SLUGS: "/"
      REGISTRATION_ENABLED: "true"
      URL_DELETION_ENABLED: "true"
      LOG_LEVEL: "info"
      NODE_ENV: "production"
```

## Setup: Development

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (tested with latest LTS)
* [NPM](https://www.npmjs.com/) (bundled with Node.js)
* [MongoDB](https://www.mongodb.com/) installed locally or an [Atlas](https://www.mongodb.com/products/platform/atlas-database) instance running

### Steps

* Clone this repository

  ```sh
  git clone https://github.com/thaddeuskkr/nova.git && cd nova
  ```

* Install all dependencies using NPM
  
  ```sh
  npm install
  ```

* Copy `.env.example` to `.env` and fill it in
  
  ```sh
  cp .env.example .env
  ```

* Build and start

  ```sh
  npm run build && npm start
  ```

## Contributing

**Contributions of all sorts are accepted and greatly appreciated.**

To contribute to this codebase, do the following:

1. [Create a fork](https://github.com/thaddeuskkr/nova/fork) of this repository
2. Follow the [setup process](#setup-development) above, but clone your fork instead
3. Push the modified code to your fork of this repository
4. Create a pull request to the `main` branch

To suggest a new feature or report a bug in Nova, please [create an issue](https://github.com/thaddeuskkr/nova/issues/new/choose).
