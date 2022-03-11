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

  const findByPk = async (idLiftOff) => {
    const result = await client.query('SELECT * FROM getLiftOff($1)', [idLiftOff]);
    if (result.rowCount === 0) {
      return null;
    }
    // on supprime les photos en doublon dans l'array photo_liftOff
    const array = result.rows[0]['photo_liftOff'].filter((value, index, arr) => arr.findIndex((t) => (JSON.stringify(t) === JSON.stringify(value))) === index);
    result.rows[0]['photo_liftOff'] = array;
    return result.rows;
  };

  const createOne = async (data) => {
    console.log('REQUETE POUR LIFTOFF BODY:', data.body);

    console.log('name:', data.name);
    console.log('typeOfTerrain:', data.typeOfTerrain);
    console.log('balise:', data.balise);
    console.log('description:', data.description);
    console.log('danger:', data.danger);
    console.log('latitude', data.latitude);
    console.log('altitude', data.altitude);
    console.log('favorableWind', data.favorableWind);
    console.log('idLandings', data.idLandings);
    console.log('balise', data.balise);

    console.log('name:', !data.name);
    console.log('typeOfTerrain:', !data.typeOfTerrain);
    console.log('balise:', !data.balise);
    console.log('description:', !data.description);
    console.log('danger:', !data.danger);
    console.log('latitude', !data.latitude);
    console.log('altitude', !data.altitude);
    console.log('favorableWind', !data.favorableWind);
    console.log('idLandings', !data.idLandings);
    console.log('balise', !data.balise);

    if (!data.name || !data.typeOfTerrain || !data.balise || !data.description || !data.danger || !data.latitude || !data.longitude || !data.altitude || !data.favorableWind || !data.idLandings) {
      return 'Manque DATA';
    }

    console.log('La data reçu', data);
    const arrayfavorableWind = data.favorableWind.split(',');
    let arrarUnfavorableWind = [];
    if (data.unfavorableWind) {
      arrarUnfavorableWind = data.unfavorableWind.split(',');
    }

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
                "altitude",
                "balise")
          VALUES
              ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
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
        Number(data.altitude),
        Number(data.balise)],
    };

    const result = await client.query(query1);
    console.log(data.photo_liftOff);
    if (data.photo_liftOff) {
      console.log('Présence PHOTO');
    } else {
      console.log('ABSENCE PHOTO');
    }
    if (data.photo_liftOff) {
      //todo Traitement regex
      console.log('LE STRING PHOTO Lift-Off:', data.photo_landing);
      const newPhoto = data.photo_liftOff.split(',');
      console.log('TABLEAU NO TRAITE :', newPhoto);
      const newPhotoTable = [];
      let jsonTopush = { name: '', url: '' };

      newPhoto.forEach((element, index) => {
        if (index % 2 === 0) {
          const reg = /(?!n)(?!a)(?!m)(?!e)(?!')(?!:)(?! )[a-zA-Z  ].+[1-9a-zA-Z]/gm;
          const name = reg.exec(element);
          jsonTopush = { ...jsonTopush, name: name[0] };
        }
        if (index % 2 !== 0) {
          const reg = /(https?:\/\/|www\.)[a-zA-Z.0-9_\-\/\?=&]{1,}/gm;
          const url = reg.exec(element);
          jsonTopush = { ...jsonTopush, url: url[0] };
          newPhotoTable.push(jsonTopush);
        }
      });
      console.log('TABLEAU FORMATER :', newPhotoTable);

      newPhotoTable.forEach(async (photo) => {
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

    // TODO : verifier que les id landing exist
    // const arrayIdLandings = data.idLandings.split(',');
    data.idLandings.forEach(async (landing) => {
      console.log('type du landing:', typeof landing, '->', landing);
      const query3 = {
        text: `INSERT INTO "liftOff_has_landing"
        ("liftOff_id",
        "landing_id")
        VALUES ($1, $2)`,
        values: [
          result.rows[0].id,
          Number(landing),
        ],
      };
      await client.query(query3);
    });
    return result.rows;
  };

  const deleteOne = async (id) => {
    await client.query('DELETE FROM "liftOff_has_landing" WHERE "liftOff_id" = $1', [id]);
    // TODO V2 delete les photos sur cloudinary avant supprimer table
    // Récupère les lien cloudinary sur
    // axios suppression photos
    await client.query('DELETE FROM "img_liftOff" WHERE "idLiftOff" = $1', [id]);
    const result = await client.query('DELETE FROM "liftOff" WHERE "id" = $1', [id]);
    return !!result.rowCount;
  };

  // TODO : update gerer les photos et les landings
  const updateOne = async (id, data) => {
    const oldData = await findByPk(id);
    if (!oldData) {
      return !!oldData;
    }
    const newData = { ...oldData[0], ...data }; // Replace the old data by the new

    const oldPhoto = oldData[0].photo_hiking;
    const newPhotoUpdate = []; // Array for the phot who exist before yhe update
    const newPhotoCreate = []; // Array for new photo who are add to the hiking

    if (data.photo_hiking) {
      const newPhoto = data.photo_hiking;

      oldPhoto.forEach((photo, index) => {
        newPhotoUpdate[index] = { ...photo, ...newPhoto[index] };
      });

      if (newPhoto.length > oldPhoto.length) {
        newPhoto.forEach((photo, index) => {
          if (index >= oldPhoto.length) {
            newPhotoCreate.push({ ...photo });
          }
        });
      }
    }

    newPhotoUpdate.forEach(async (photo) => {
      const query2 = {
        text: `UPDATE "img_liftOff" SET
        "title" = $1,
        "url" = $2,
        "idLiftOff" = $3
        WHERE id = $4`,
        values: [
          photo.title,
          photo.url,
          photo.idLiftOff,
          photo.id,
        ],
      };
      await client.query(query2);
    });

    newPhotoCreate.forEach(async (photo) => {
      const query2 = {
        text: `INSERT INTO "img_liftOff"
        ("title",
        "url",
        "idLiftOff")
        VALUES ($1, $2, $3)`,
        values: [
          photo.title,
          photo.url,
          id,
        ],
      };
      await client.query(query2);
    });

    const query = {
      text: `UPDATE "liftOff" SET
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
            WHERE id = $11`,
      values: [
        newData.name,
        newData.typeOfTerrain,
        newData.description,
        newData.danger,
        newData.fflvLink,
        newData.latitude,
        newData.longitude,
        newData.favorableWind,
        newData.unfavorableWind,
        newData.altitude,
        id],
    };
    await client.query(query);

    return findByPk(id);
  };

  const returnDatamapper = {
    findAll,
    findByPk,
    createOne,
    deleteOne,
    updateOne,
  };
  return returnDatamapper;
};
