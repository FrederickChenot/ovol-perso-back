const client = require('../config/postgres');

module.exports = {
  async findUser(user) {
    console.log('user', user);
    const result = await client.query('SELECT * FROM "user" WHERE "user"."login" = $1', [user]);
    return result.rows[0];
  },
};
