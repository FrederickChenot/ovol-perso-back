const client = require('../config/postgres');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM "hiking"');
    return result.rows;
  },

  async findOne(idHiking) {
    const result = await client.query('SELECT * FROM getOneHiking($1)', [idHiking]);
    const liftOff = await client.query('SELECT * FROM getLiftOff($1)', [result.rows[0]['lift-off_id']]);
    result.rows[0].idLandings = liftOff.rows[0].idLandings;
    return result.rows;
  },

  async creatOne(
    name,
    imgCard,
    mountain,
    resume,
    keyStage,
    startingPoint,
    hikingPlan,
    positiveElevation,
    negativeElevation,
    overallLength,
    landType,
    ignCardReference,
    hightPoint,
    lowPoint,
    difficulty,
    userId,
    liftOffId,
  ) {
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
            "lift-off_id")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING id`,
      values: [
        name,
        imgCard,
        mountain,
        resume,
        keyStage,
        startingPoint,
        hikingPlan,
        positiveElevation,
        negativeElevation,
        overallLength,
        landType,
        ignCardReference,
        hightPoint,
        lowPoint,
        difficulty,
        userId,
        liftOffId],
    };
    const result = await client.query(query);
    return result.rows;
  },
};
