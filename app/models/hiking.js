const client = require('../config/postgres');

/**
 * @typedef {object} Hiking
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} name - name of the hiking
 * @property {string} img_card - url of hiking image
 * @property {string} mountain - name of the moutain
 * @property {string} resume - resume of the hiking
 * @property {string} key_stage - keys stage of the hiking
 * @property {string} starting_point - starting point of the hiking
 * @property {string} hiking_plan - url of the hiking plan
 * @property {number} positive_elevation - positive elevation of the hiking
 * @property {number} negative_elevation - negative elevation of the hiking
 * @property {number} overall_length - overall length of the hiking
 * @property {string} land_type - land_type length of the hiking
 * @property {string} ign_card_reference - ign card reference length of the hiking
 * @property {number} hight_point - hight point length of the hiking
 * @property {number} low_point - low point length of the hiking
 * @property {string} difficulty - difficulty length of the hiking
 * @property {number} user_id - id of the owner
 * @property {number} liftOff_id - id of the liftoff
 */

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "hiking"');
    return result.rows;
  },

  async findOne(idHiking) {
    const result = await client.query('SELECT * FROM getOneHiking($1)', [idHiking]);
    const liftOff = await client.query('SELECT * FROM getLiftOff($1)', [result.rows[0]['liftOff_id']]);
    result.rows[0].idLandings = liftOff.rows[0].idLandings;
    return result.rows;
  },

  async creatOne(data) {
    const query = {
      text: `INSERT INTO "hiking"
            ("name",
            "img_card",
            "mountain",
            "resume",
            "key_stage",
            "starting_point",
            "hiking_plan",
            "positive_elevation",
            "negative_elevation",
            "overall_length",
            "land_type",
            "ign_card_reference",
            "hight_point",
            "low_point",
            "difficulty",
            "user_id",
            "liftOff_id")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING id`,
      values: [
        data.name,
        data.imgCard,
        data.mountain,
        data.resume,
        data.keyStage,
        data.startingPoint,
        data.hikingPlan,
        data.positiveElevation,
        data.negativeElevation,
        data.overallLength,
        data.landType,
        data.ignCardReference,
        data.hightPoint,
        data.lowPoint,
        data.difficulty,
        data.userId,
        data.liftOffId],
    };
    const result = await client.query(query);
    // Request to put photo in the img_hiking table
    data.photos.forEach(async (photo) => {
      const query2 = {
        text: `INSERT INTO "img_hiking"
        ("title",
        "url",
        "idHiking")
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

  async updateOne(id) {
    // ss
  },
};
