const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'Elkin',
  password: 'Rod.1031',
  database: 'my_store'
});

module.exports = pool;
