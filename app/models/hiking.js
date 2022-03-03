const client = require('../config/postgres');

module.exports = function datamapper() {
  const findAll = async () => {
    const result = await client.query('SELECT * FROM "hiking"');
    return result.rows;
  };

  const findByPk = async (idHiking) => {
    const result = await client.query('SELECT * FROM getOneHiking($1)', [idHiking]);
    const liftOff = await client.query('SELECT * FROM getLiftOff($1)', [result.rows[0].liftOff_id]);
    result.rows[0].idLandings = liftOff.rows[0].idLandings;
    return result.rows;
  };

  const creatOne = async (data) => {
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
  };

  const updateOne = async (id, data) => {
    const oldData = await findByPk(id);
    const newData = { ...oldData[0], ...data };
    console.log(newData);
    console.log(newData.imgCard);
    console.log(newData.img_card);

    const query = {
      text: `UPDATE "hiking" SET
      "name" = $1,
      "img_card" = $2,
      "mountain" = $3,
      "resume"  = $4,
      "key_stage" = $5,
      "starting_point" = $6,
      "hiking_plan" = $7,
      "positive_elevation" = $8,
      "negative_elevation" = $9,
      "overall_length" = $10,
      "land_type" = $11,
      "ign_card_reference" = $12,
      "hight_point" = $13,
      "low_point" = $14,
      "difficulty" = $15,
      "user_id" = $16,
      "liftOff_id" = $17
      WHERE id = $18
      RETURNING *`,
      values: [
        newData.name,
        newData.imgCard,
        newData.mountain,
        newData.resume,
        newData.keyStage,
        newData.startingPoint,
        newData.hikingPlan,
        newData.positiveElevation,
        newData.negativeElevation,
        newData.overallLength,
        newData.landType,
        newData.ignCardReference,
        newData.hightPoint,
        newData.lowPoint,
        newData.difficulty,
        newData.userId,
        newData.liftOffId,
        id],
    };
    const result = await client.query(query);
    return result.rows;
  };

  const retunrDatamapper = {
    findAll,
    findByPk,
    creatOne,
    updateOne,
  };
  return retunrDatamapper;
};
