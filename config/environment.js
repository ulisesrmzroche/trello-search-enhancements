const path = require('path');

const ENV = {
  environment: process.env.NODE_ENV || 'development',
  ROOT_PATH: path.resolve(__dirname, './../'),
  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  },
  INTEGRATIONS: {},
};

ENV.INTEGRATIONS.trello = {
  devKey: process.env.TRELLO_DEV_KEY,
  devToken: process.env.TRELLO_DEV_TOKEN,
};

module.exports = ENV;
