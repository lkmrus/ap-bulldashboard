# Bull-dashboard

### Recommendation
* Node v16+
* NPM v8+

### Setup
* Edit the configuration file
  - For dev, copy `config.yml` to `config.dev.yml` and edit it
  - For prod: `config.yml`
  - To connect to redis, the `REDIS_SENTINELS` and `REDIS_SENTINEL_MASTER_NAME` env variables are used in priority, or from the `.yml` configuration
  - If necessary, you can change the application port using `APP_PORT`
  - To set the base path, use `APP_BASE_PATH`
* Installing a dependency with the command `npm install`

### Run
* Run prod mode
  `npm run start`
* Run dev mode
  `npm run start:dev`
