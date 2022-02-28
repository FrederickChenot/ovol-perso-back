const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "lift-off"');
    return result.rows;
  },

  async findOne(idLiftOff) {
    const result = await client.query('SELECT * FROM "lift-off" WHERE id = $1', [idLiftOff]);
    return result.rows;
  },
};
