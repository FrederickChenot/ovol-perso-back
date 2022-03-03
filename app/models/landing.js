const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  },

  async findOne(idLanding) {
    const result = await client.query('SELECT * FROM getLanding($1)', [idLanding]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows;
  },

  async findLandings(ids) {
    let query = 'SELECT * FROM "landing" JOIN "img_landing" ON "img_landing"."idLanding" = "landing"."id" WHERE "landing"."id" IN ';
    let querytempo = '(';
    const tablelongeur = ids.length;
    ids.forEach((id, index) => {
      if (index === tablelongeur - 1) {
        querytempo += `${id})`;
        query += querytempo;
      } else {
        querytempo += `${id}, `;
      }
    });
    const result = await client.query(query);
    return result.rows;
  },

  async createOne(data) {
    const query1 = {
      text: `INSERT INTO "landing"
                ("name",
                "typeOfTerrain",
                "description",
                "danger",
                "fflvLink",
                "latitude",
                "longitude",
                "favorableWind",
                "unfavorableWind",
                "altitude")
          VALUES
              ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      values: [
        data.name,
        data.typeOfTerrain,
        data.description,
        data.danger,
        data.fflvLink,
        data.latitude,
        data.longitude,
        data.favorableWind,
        data.unfavorableWind,
        data.altitude],
    };

    const result = await client.query(query1);
    // Request to put photo in the img_landing table
    data.photos.forEach(async (photo) => {
      const query2 = {
        text: `INSERT INTO "img_landing"
        ("title",
        "url",
        "idLanding")
        VALUES ($1, $2, $3)`,
        values: [
          photo.name,
          photo.url,
          result.rows[0].id,
        ],
      };
      await client.query(query2);
    });
    return result.rows;
  },
};
