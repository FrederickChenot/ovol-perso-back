const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  },

  async findOne(idLanding) {
    const result = await client.query('SELECT * FROM getLanding($1)', [idLanding]);
    console.log(result.rows[0])
    return result.rows;
  },
};
