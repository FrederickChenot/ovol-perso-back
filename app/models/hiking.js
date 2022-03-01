const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "hiking"');
    return result.rows;
  },

  async findOne(idHiking) {
    const result = await client.query('SELECT * FROM getOneHiking($1)', [idHiking]);
    const liftOff = await client.query('SELECT * FROM getLiftOff($1)', [result.rows[0]['lift-off_id']]);
    result.rows[0].idLandings = liftOff.rows[0].idLandings;
    return result.rows;
  },
};
