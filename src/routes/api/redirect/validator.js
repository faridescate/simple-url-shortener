'use strict';

const schemas = require('../../../utils/schemas');

const validator = {
  redirect: {
    validate: {
      params: schemas.hashSchema
    }
  }
};

module.exports = validator
