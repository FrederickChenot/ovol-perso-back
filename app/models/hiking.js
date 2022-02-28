const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "hiking"');
    return result.rows;
  },

  // async findOne(idHiking) {
  //   const result = await client.query('SELECT * FROM "hiking" WHERE id = $1', [idHiking]);
  //   return result.rows;
  // },
  async findOne(idHiking) {
    const query = `SELECT * FROM "hiking"
                      JOIN "img_hiking" ON img_hiking."idHiking" = "hiking"."id"
                      JOIN "lift-off" ON "hiking"."lift-off_id" = "lift-off"."id"
                      JOIN "img_lift-off" ON "lift-off"."id" = "img_lift-off"."idLiftOff"
                      JOIN "lift-off_has_landing" ON "lift-off_has_landing"."lift-off_id" = "lift-off"."id"
                      JOIN "landing" ON "lift-off_has_landing"."landing_id" = "landing"."id"
                      WHERE hiking."id" = ${idHiking}`
    const result = await client.query(query);
    return result.rows;
}



};
