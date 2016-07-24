## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Docker

1. `docker-machine create --driver virtualbox application-frontend`
2. `docker-machine env application-frontend`
3. `eval "$(docker-machine env application-frontend)"`
4. `docker build -t application-frontend .`

## Docker - testing
1. `docker build -t application-frontend .`
2. `docker run -it -p 8080:8080 --name application-frontend_1 application-frontend`


## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. Remove the `"PORT": 8080` line from the `betterScripts` / `start-prod` section of `package.json`.
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set NODE_PATH=./src`
4. `heroku config:set NPM_CONFIG_PRODUCTION=false`
  * This is to enable webpack to run the build on deploy.

The first deploy might take a while, but after that your `node_modules` dir should be cached.
