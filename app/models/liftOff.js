const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "liftOff"');
    return result.rows;
  },

  async findOne(idLiftOff) {
    const result = await client.query('SELECT * FROM getLiftOff($1)', [idLiftOff]);
    if (result.rowCount === 0) {
      return null;
    }
    console.log('model', result.rows[0]);
    // on supprime les photos en doublon dans l'array photo_liftOff
    const array = result.rows[0]['photo_liftOff'].filter((value, index, arr) => arr.findIndex((t) => (JSON.stringify(t) === JSON.stringify(value))) === index);
    result.rows[0]['photo_liftOff'] = array;
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
      text: `INSERT INTO "liftOff"
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
    // Request to put photo in the img_liftOff table
    console.log('data photo', data.photos);
    data.photos.forEach(async (photo) => {
      const query2 = {
        text: `INSERT INTO "img_liftOff"
        ("title",
        "url",
        "idLiftOff")
        VALUES ($1, $2, $3)`,
        values: [
          photo.name,
          photo.url,
          result.rows[0].id,
        ],
      };
      await client.query(query2);
    });
    let boucle = 1;
    data.idLandings.forEach(async (landing) => {
      boucle += 1;
      const query3 = {
        text: `INSERT INTO "liftOff_has_landing"
        ("liftOff_id",
        "landing_id")
        VALUES ($1, $2)`,
        values: [
          result.rows[0].id,
          landing,
        ],
      };
      await client.query(query3);
    });
    console.log('Nbr de tour',)
    return result.rows;
  },
};
