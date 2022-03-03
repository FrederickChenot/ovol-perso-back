const hikingDataMapper = require('../models/hiking');

module.exports = {
  async getAll(_req, res) {
    const result = await hikingDataMapper.findAll();
    return res.json(result);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const result = await hikingDataMapper.findOne(IdHiking);
    if (!result) {
      return res.status(404).json({ message: 'page not found' });
    }
    return res.json(result);
  },
  async create(req, res) {
    const hiking = await hikingDataMapper.creatOne(req.body);
    return res.json(hiking);
  },

  async updateOne(req, res) {
    // const {
    //   id,
    //   name,
    //   imgCard,
    //   mountain,
    //   resume,
    //   keyStage,
    //   startingPoint,
    //   hikingPlan,
    //   positiveElevation,
    //   negativeElevation,
    //   overallLength,
    //   landType,
    //   ignCardReference,
    //   hightPoint,
    //   lowPoint,
    //   difficulty,
    //   userId,
    //   liftOffId,
    //  } = req.body;

    //  const hiking = getOne(id).toJson;
    //  console.log(hiking);
    // // const hiking = await hikingDataMapper.updateOne(id);
    // return res.json(hiking);
  },
};
