const { Pool } = require('pg');

let config;
if (process.env.NODE_ENV === 'development') {
  config = {
    connectionString: process.env.DATABASE_URL_DEV,
  };
} else if (process.env.NODE_ENV === 'staging') {
  config = {
    connectionString: process.env.DATABASE_URL_STAGING,
    ssl: { rejectUnauthorized: false },
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    connectionString: process.env.DATABASE_URL_PRODUCTION,
    ssl: { rejectUnauthorized: false },
  };
}

module.exports = new Pool(config);
