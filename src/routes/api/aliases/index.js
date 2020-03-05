'use strict';

const Routes = require('./route');

const init = async function(server, configs) {
  return Routes(server, configs);
}

module.exports = {
  init
};
