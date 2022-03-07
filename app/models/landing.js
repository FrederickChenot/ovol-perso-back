const client = require('../config/postgres');

/**
 * @typedef {object} Landing
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} name - name
 * @property {string} typeOfTerrain - type of terrain
 * @property {string} description - description
 * @property {string} danger - danger
 * @property {string} fflvLink - url fflv
 * @property {number} latitude - latitude
 * @property {number} longitude - longitude
 * @property {[string]} favorableWind - favorable Wind
 * @property {[string]} unfavorableWind - unfavorableWind
 * @property {number} altitude - altitude
 */

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  },

  async findByPk(idLanding) {
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
    if (data.photos.length > 0) {
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
    } else {
      const query2 = {
        text: `INSERT INTO "img_landing"
        ("title",
        "url",
        "idLanding")
        VALUES ($1, $2, $3)`,
        values: [
          'default_landing',
          'https://res.cloudinary.com/ovol/image/upload/v1646311339/assets/parachute-landing_mbaiu0.jpg',
          result.rows[0].id,
        ],
      };
      await client.query(query2);
    }
    return result.rows;
  },

  async update(id, data) {
    // TODO: update les photos
    const landing = await client.query('SELECT * FROM landing WHERE id = $1', [id]);
    if (landing.rowCount === 0) {
      return null;
    }
    const oldLanding = landing.rows[0];
    const newLanding = { ...oldLanding, ...data };
    const query = {
      text: `UPDATE "landing" SET
                "name" = $1,
                "typeOfTerrain" = $2,
                "description" = $3,
                "danger" = $4,
                "fflvLink" = $5,
                "latitude" = $6,
                "longitude" = $7,
                "favorableWind" = $8,
                "unfavorableWind" = $9,
                "altitude" = $10
    WHERE "id" = $11 RETURNING *`,
      values: [
        newLanding.name,
        newLanding.typeOfTerrain,
        newLanding.description,
        newLanding.danger,
        newLanding.fflvLink,
        newLanding.latitude,
        newLanding.longitude,
        newLanding.favorableWind,
        newLanding.unfavorableWind,
        newLanding.altitude,
        id],
    };

    const result = await client.query(query);
    // PHOTOS
    const oldPhotos = landing.rows[0].photo_landing;
    console.log('old photo', oldPhotos);
    const newPhotos = { ...oldLanding, ...data.photos };
    newPhotos.forEach(async (photo) => {
      const query2 = {
        text: `UPDATE "img_landing" SET
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
    //
    return result.rows;
  },
  // TODO delete
  async delete(id) {
    // TODO: delete les photos dans img_Landing
    await client.query('DELETE FROM "img_landing" WHERE "idLanding" = $1', [id]);
    const result = await client.query('DELETE FROM "landing" WHERE id = $1', [id]);
    // TODO : chercher dans lifOff_has_landing et delete les associations avec landing id
    return !!result.rowCount;
  },
};
