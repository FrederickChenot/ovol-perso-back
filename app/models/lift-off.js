const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "lift-off"');
    return result.rows;
  },

  async findOne(idLiftOff) {
    const result = await client.query('SELECT * FROM getLiftOff($1)', [idLiftOff]);
    console.log(result.rows[0]['landings'])
    return result.rows;
  },
};
