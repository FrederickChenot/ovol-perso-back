/* eslint-disable dot-notation */
const client = require('../config/postgres');

/**
 * @typedef {object} LiftOff
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

module.exports = function datamapper() {
  const findAll = async () => {
    const result = await client.query('SELECT * FROM "liftOff"');
    return result.rows;
  };

  const findOne = async (idLiftOff) => {
    const result = await client.query('SELECT * FROM getLiftOff($1)', [idLiftOff]);
    if (result.rowCount === 0) {
      return null;
    }
    console.log('model', result.rows[0]);
    // on supprime les photos en doublon dans l'array photo_liftOff
    const array = result.rows[0]['photo_liftOff'].filter((value, index, arr) => arr.findIndex((t) => (JSON.stringify(t) === JSON.stringify(value))) === index);
    result.rows[0]['photo_liftOff'] = array;
    return result.rows;
  };

  const createOne = async (data) => {
    const query1 = {
      text: `INSERT INTO "liftOff"
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
    // Request to put photo in the img_liftOff table
    if (data.photos.length > 0) {
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
    } else {
      const query2 = {
        text: `INSERT INTO "img_liftOff"
        ("title",
        "url",
        "idLiftOff")
        VALUES ($1, $2, $3)`,
        values: [
          'default_liftOff',
          'https://res.cloudinary.com/ovol/image/upload/v1646312780/assets/parachute_liftOff_wau7fx.jpg',
          result.rows[0].id,
        ],
      };
      await client.query(query2);
    }
    data.idLandings.forEach(async (landing) => {
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
    return result.rows;
  };
  // TODO : update
  // gerer les photos et les landings
  // TODO : delete
  // gerer les photos et les landings
  const returnDatamapper = {
    findAll,
    findOne,
    createOne,
  };
  return returnDatamapper;
};
