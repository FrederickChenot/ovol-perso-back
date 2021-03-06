/* eslint-disable no-param-reassign */
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
 * @property {string} photo_landing - string of photo(s)
 */

module.exports = function datamapper() {
  const findAll = async () => {
    const result = await client.query('SELECT * FROM "landing"');
    return result.rows;
  };

  const findByPk = async (idLanding) => {
    const result = await client.query('SELECT * FROM getLanding($1)', [idLanding]);
    if (result.rowCount === 0) return null;

    return result.rows;
  };

  const findLandings = async (ids) => {
    // TODO : voir pour requete optimisé
    const result = [];
    await Promise.all(ids.map(async (id) => {
      result.push(await findByPk(id));
    }));
    return result;
  };

  const createOne = async (data) => {
    const error = { message: 'Incomplete forms landing', statusCode: 515 };

    if (!data.name) throw error;
    if (!data.typeOfTerrain) throw error;
    if (!data.description) throw error;
    if (!data.danger) throw error;
    if (!data.latitude) throw error;
    if (!data.longitude) throw error;
    if (!data.altitude) throw error;
    if (!data.favorableWind) throw error;

    const arrayfavorableWind = data.favorableWind.split(',');

    let arrarUnfavorableWind = [];
    if (data.unfavorableWind) arrarUnfavorableWind = data.unfavorableWind.split(',');

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
        Number(data.latitude),
        Number(data.longitude),
        arrayfavorableWind,
        arrarUnfavorableWind,
        Number(data.altitude)],
    };

    const result = await client.query(query1);

    // Request to put photo in the img_landing table
    if (data.photo_landing) {
      const newPhoto = data.photo_landing.split(',');
      const newPhotoTable = [];
      let jsonTopush = { name: '', url: '' };
      // Parce data.photo_landing to get a json like below
      // [{"name": "name_photo", "url": "url_Photo"}, {"name": "name_photo", "url": "url_Photo"}]
      newPhoto.forEach((element, index) => {
        if (index % 2 === 0) {
          // Extacte the name of the photo on a string like below
          // example: "'name': 'update photo  test2'"" extract = update photo  test2
          const reg = /(?!n)(?!a)(?!m)(?!e)(?!')(?!:)(?! )[a-zA-Z  ].+[1-9a-zA-Z]/gm;
          const name = reg.exec(element);
          jsonTopush = { ...jsonTopush, name: name[0] };
        }
        if (index % 2 !== 0) {
          // Extacte the url of the photo on a string like below
          // example: "'url': 'https://res.cloudinary.com/ovol/image/upload/v1646311339/assets/parachute-landing_mbaiu0.jpg'"
          // extract = https://res.cloudinary.com/ovol/image/upload/v1646311339/assets/parachute-landing_mbaiu0.jpg
          const reg = /(https?:\/\/|www\.)[a-zA-Z.0-9_\-\/\?=&]{1,}/gm;
          const url = reg.exec(element);
          jsonTopush = { ...jsonTopush, url: url[0] };
          newPhotoTable.push(jsonTopush);
        }
      });

      newPhotoTable.forEach(async (photo) => {
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
    const landing = await findByPk(id);
    const oldLanding = landing[0];
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
    if (data.photos) {
      // on supprime toutes les refs avec l'id du landing
      await client.query('DELETE FROM "img_landing" WHERE "idLanding" = $1', [id]);
      // puis on ajoute les nouvelles données de photos
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
            landing[0].id,
          ],
        };
        await client.query(query2);
      });
    }
    //
    return result.rows;
  };

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
