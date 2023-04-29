const fastify = require('fastify');
const { Queue } = require('bullmq');
const Redis = require('ioredis');
const config = require('./config');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { FastifyAdapter } = require('@bull-board/fastify');

const connection =
  process.env.REDIS_SENTINELS && process.env.REDIS_SENTINEL_MASTER_NAME
    ? {
        sentinels: JSON.parse(process.env.REDIS_SENTINELS),
        name: process.env.REDIS_SENTINEL_MASTER_NAME,
      }
    : config.redis;

const redis = new Redis(connection);

const queues = {};
for (const name of config.queues) {
  queues[name] = new Queue(name, { ...config.queue, connection: redis });
}

redis.on('connect', () => {
  console.log('Server redis connection has been established successfully');

  const server = fastify();
  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues: Object.values(queues).map((queue) => new BullMQAdapter(queue)),
    serverAdapter,
  });

  server.register(serverAdapter.registerPlugin());

  server
    .listen(process.env.APP_PORT || config.server.port, process.env.APP_HOST || config.server.host)
    .then((address) =>
      console.log(`Server started successfully at ${address}`),
    )
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
});
