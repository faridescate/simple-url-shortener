'use strict';
require('dotenv').config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || "admin",
      user: process.env.DB_USER || "admin",
      password: process.env.DB_PASSWORD || "admin",
      pool: {
        min: process.env.DB_POOL_MIN || 2,
        max: process.env.DB_POOL_MAX || 5
      }
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/db/migrations"
    }
  }
};
