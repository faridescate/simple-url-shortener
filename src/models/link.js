'use strict';

const knex = require('../knex');
const shortCode = require('../helpers/shortCode');

const selectable = [
  "link.id",
  "link.address",
  "link.hash",
  "link.visit_count",
  "link.created_at",
  "link.updated_at"
];

const Link = {
  getById: async (id) => {
    return knex('link')
    .select(...selectable)
    .where('id','=',id)
    .first();
  },

  getByHash: async ({hash}) => {
    const id = shortCode.getNumber(hash);
    return Link.getById(id);
  },

  getByAddress: async ({ address }) => {
    return knex('link')
      .select(...selectable)
      .where('address', '=', address)
      .first();
  },

  insert: async ({ address }) => {
    const [ id ] = await knex('link')
      .insert({ address })
      .returning('id');
    const hash = shortCode.generate(id);
    return Link.update({id, hash});
  },

  update: async ({id, hash}) => {
    await knex('link')
      .where('id', id)
      .update({
        hash: hash
      });
    return Link.getById(id);
  },

  visit: async ({hash}) => {
    const id = shortCode.getNumber(hash);
    await knex('link')
      .where('id', id)
      .increment('visit_count', 1)
    return Link.getById(id);
  }
}

module.exports = Link;
