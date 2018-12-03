const path = require('path');
const basePath = path.join(__dirname, '/services');

module.exports = {
  apps : [{
    name: 'GraphQL Gateway Service',
    script: `${basePath}/graphql-gateway/index.js`,
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      PORT: 3000,
      DB_SERVICE_PORT: 3001,
      NODE_ENV: 'development',
      Q_URI: '[FILL_ME - eg. amqp://... ]',
      _QUEUE_NAME: '[FILL_ME]'
    }
  }, {
    name: 'MongoDB Service',
    script: `${basePath}/mongoDB/server.js`,
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      PORT: 3001,
      NODE_ENV: 'development',
      DB_URL: '[FILL_ME - eg. mongodb://user:pass@domain/db]'
    }
  }, {
    name: 'Mailing Service',
    script: `${basePath}/mailing/index.js`,
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      Q_URI: '[FILL_ME - eg. amqp://... ]',
      _QUEUE_NAME: 'queue_test_1',
      MJ_API_PUBLIC: '[FILL_ME]',
      MJ_API_SECRET: '[FILL_ME]'
    }
  }]
};
