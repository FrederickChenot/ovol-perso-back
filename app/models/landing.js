const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  },

  async findOne(idLanding) {
    const result = await client.query('SELECT * FROM "landing" WHERE id = $1', [idLanding]);
    return result.rows;
  },
};
