const Sails = require('sails').Sails;
const Redis = require('ioredis');

module.exports = function defineRedisHook(sails) {
  return {
    initialize: async function(cb) {
      sails.log.info('Initializing custom hook (`redis`)');

      let client;
      const cfg = sails.config[this.configKey];

      if (Array.isArray(cfg)) {
        client = new Redis.Cluster(cfg);
      } else {
        client = new Redis(cfg);
      }

      this.client = client;
    },

    client: this.client,
  };
}
