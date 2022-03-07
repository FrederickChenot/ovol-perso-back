/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
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

module.exports = function datamapper() {
  const findAll = async () => {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  };

  const findByPk = async (idLanding) => {
    const result = await client.query('SELECT * FROM getLanding($1)', [idLanding]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows;
  };

  const findLandings = async (ids) => {
    // TODO : voir pour requete obtimisé
    const result = [];
    await Promise.all(ids.map(async (id) => {
      result.push(await findByPk(id));
    }));
    return result;
  };

  const createOne = async (data) => {
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
  };

  const update = async (id, data) => {
    // TODO: update les photos
    const landing = await findByPk(id);
    console.log(landing);
    if (landing.rowCount === 0) {
      return null;
    }
    const oldLanding = landing[0];
    console.log('oldLanding', oldLanding);
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

    if (data.photos) {
      const oldPhotos = landing[0].photo_landing;
      console.log('data.photo', data.photos);
      console.log('old photo', oldPhotos);
      const newPhotos = { ...oldLanding, ...data.photos };
      console.log('newPhoto', newPhotos);
      newPhotos.forEach(async (photo) => {
        const query2 = {
          text: `INSERT INTO "img_landing" VALUES
        ("title",
        "url",
        "idLanding")
        VALUES ($1, $2, $3)`,
          values: [
            photo.name,
            photo.url,
            landing[0].id,
          ],
        };
        await client.query(query2);
      }
      );
    }
    //
    return result.rows;
  };
  // TODO delete
  const deleteOne = async (id) => {
    await client.query('DELETE FROM "liftOff_has_landing" WHERE "landing_id" = $1', [id]);
    // TODO V2 delete les photos sur cloudinary avant supprimer table
    // Récupère les lien cloudinary sur
    // axios suppression photos
    await client.query('DELETE FROM "img_landing" WHERE "idLanding" = $1', [id]);
    const result = await client.query('DELETE FROM "landing" WHERE id = $1', [id]);
    return !!result.rowCount;
  };

  const returnDatamapper = {
    findAll,
    findByPk,
    findLandings,
    createOne,
    update,
    deleteOne,
  };
  return returnDatamapper;
};

/*
const findLandings = async (ids) => {
  const promises = [];
  const result = []
  for (const id of ids) {
    promises.push(new Promise((res, err) => {
      findByPk(id).then((data) => {
        res(data);
      });
    }));
  }
 await Promise.all(promises).then((data) => {
   result.push(data)
 });
  return result
};
*/
