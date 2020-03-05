'use strict';

const Joi = require('@hapi/joi');
const Configs = require('../configuration');

const serverConfigs = Configs.getServerConfigs();
const DOMAIN = process.env.DOMAIN || serverConfigs.domain;

const urlSchema = Joi.object({
  url: Joi.string()
    .required()
    .uri({
      scheme: [
        'http',
        'https'
      ],
      domain: {
        tlds: true,
      }
    })
    .message('URL is not valid')
    .custom((value, helpers) => {
      const test1 = value.toLowerCase().startsWith(`http://${DOMAIN}`.toLowerCase())
      const test2 = value.toLowerCase().startsWith(`https://${DOMAIN}`.toLowerCase())
      if (test1 || test2) {
        throw new Error(`Sorry you can't use our domain`)
      }
      return value;
    })
    .message(`Sorry you can't use our domain`)
    .example(`https://leetcode.com/terms/`)
});

const shortUrlSchema = Joi.object({
  shorten: Joi.string()
    .required()
    .pattern(new RegExp('\/r\/[A-Za-z0-9_-]+$'))
    .example(`http://${DOMAIN}/r/HASH_OF_URL`)
    .default(`http://${DOMAIN}/r/HASH_OF_URL`)
});

const hashSchema = Joi.object({
  shorten: Joi.string()
    .required()
    .pattern(new RegExp('[A-Za-z0-9_-]+$'))
    .example(`yCz1`)
    .default(`Ba`)
});

module.exports = {
  urlSchema,
  shortUrlSchema
}
