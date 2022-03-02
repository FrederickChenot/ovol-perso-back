const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  },

  async findOne(idLanding) {
    const result = await client.query('SELECT * FROM getLanding($1)', [idLanding]);
    console.log(result.rows[0]);
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

  async createOne(
    name,
    typeOfTerrain,
    description,
    danger,
    fflvLink,
    latitude,
    longitude,
    favorableWind,
    unfavorableWind,
    altitude,
  ) {
    const query = {
      text: `INSERT INTO "landing"
                ("name",
                "type-of-terrain",
                "description",
                "danger",
                "fflv-link",
                "latitude",
                "longitude",
                "favorable-wind",
                "unfavorable-wind",
                "altitude")
          VALUES
              ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      values: [name,
        typeOfTerrain,
        description,
        danger,
        fflvLink,
        latitude,
        longitude,
        favorableWind,
        unfavorableWind,
        altitude],
    };

    const result = await client.query(query);
    console.log('post landing id', result.rows);
    return result.rows;
  },
};
