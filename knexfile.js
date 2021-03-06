// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      // tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: process.env.TEST_DB_URL,

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      // tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.PROD_DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      // tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  staging: {
    client: 'postgresql',
    connection: process.env.STAGE_DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      // tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
