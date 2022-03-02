const hikingDataMapper = require('../models/hiking');

module.exports = {
  async getAll(_req, res) {
    const hiking = await hikingDataMapper.findAll();
    return res.json(hiking);
  },

  async getOne(req, res) {
    const IdHiking = Number(req.params.id);
    const hiking = await hikingDataMapper.findOne(IdHiking);
    return res.json(hiking);
  },
  async create(req, res) {
    const {
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
    } = req.body;
    const hiking = await hikingDataMapper.creatOne(
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
    );
    return res.json(hiking);
  },
};
