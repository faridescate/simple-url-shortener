'use strict';

const Routes = require('./route');

const init = async function (server, configs) {
  try {
    return Routes(server, configs);
  } catch (error) {
    console.log("error");
  }
}

module.exports = {
  init
};
