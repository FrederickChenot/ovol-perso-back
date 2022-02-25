const client = require('../config/postgres');

module.exports = {

  async findAll() {
    const result = await client.query('SELECT * FROM "item"');
    return result.rows;
  },


  async findByLabel(itemLabel) {
    const result = await client.query(`SELECT * FROM item WHERE label = '${itemLabel}';`);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
  async insert(item) {
    const savedPost = await client.query(`INSERT INTO item(label) VALUES('${item.label}');`);

    return savedPost.rows[0];
  },
};
