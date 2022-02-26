const client = require('../config/postgres');

module.exports = {

  async findAll() {
    const result = await client.query('SELECT * FROM "hiking"');
    return result.rows;
  },

  async findOne(idHiking) {
    const result = await client.query('SELECT * FROM "hiking" WHERE id = $1', [idHiking]);
    return result.rows;
  },
};
