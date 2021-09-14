# Webockets Backend 📣

## Technologies 🔌

(Nodejs, ws, heroku, postgres)

## Frontend for this project

[Frontend project](https://github.com/simbathesailor/frontend-websockets-learn)

## Boilerplate Repository

[https://github.com/danielfsousa/express-rest-boilerplate](https://github.com/danielfsousa/express-rest-boilerplate)

## Requirements

-   [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
-   [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone --depth 1 https://github.com/danielfsousa/express-rest-es2017-boilerplate
cd express-rest-es2017-boilerplate
rm -rf .git
```

#### Install dependencies:

```bash
yarn
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev

# run container in production
yarn docker:prod

# run tests
yarn docker:test
```

## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
yarn deploy
```

## Tutorials

-   [Create API Documentation Using Squarespace](https://selfaware.blog/home/2018/6/23/api-documentation)

## Inspirations

-   [KunalKapadia/express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api)
-   [diegohaz/rest](https://github.com/diegohaz/rest)

## License

[MIT License](README.md) - [Anil Chaudhary](https://github.com/simbathesailor)

## Refrences

https://github.com/websockets/ws#server-broadcast
https://github.com/websockets/ws/blob/master/doc/ws.md#event-connection
