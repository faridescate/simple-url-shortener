'use strict';

const schemas = require('../../../utils/schemas');

const validator = {
  redirect: {
    validate: {
      params: schemas.hash
    }
  }
};

module.exports = validator
