'use strict';
require('dotenv').config()

const configs = require(`./config.${process.env.NODE_ENV || "dev"}`);

function getServerConfigs() {
  return configs.server;
}

module.exports = {
  getServerConfigs,
}
