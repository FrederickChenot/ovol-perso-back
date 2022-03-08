const express = require('express');
const apiController = require('../helpers/apiController');

const router = express.Router();

const hikingController = require('../controllers/hiking.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
/**
   * GET /api/hiking/{id}
   * @summary Get one hiking with the associated photo(s) on the id
   * @tags Hiking
   * @return {[Hiking]} 200 - success response - application/json
   * @param {number} id.path - id of the hiking
   */
  .get(apiController(hikingController.getOne))
  /**
   * PATCH /api/hiking/{id}
   * @summary PATH one hiking on the id
   * @tags Hiking
   * @return {[Hiking]} 200 - success response - application/json
   * @param {number} id.path - id of the hiking
   * @param {hiking} request.body.required - hiking info
   */
  .patch(auth(), apiController(hikingController.updateOne))
  /**
   * DELETE /api/hiking/{id}
   * @summary Delete one hiking with the associated photo(s) on the id
   * @tags Hiking
   * @security BearerAuth
   * @return {string} 200 - success response - application/json
   * @param {number} id.path - id of the hiking
   */
  .delete(auth(), apiController(hikingController.deleteOne));
// all
router.route('/')
  /**
   * GET /api/hiking
   * @summary Get all hiking
   * @tags Hiking
   * @return {array<Hiking>} 200 - success response - application/json
   */
  .get(apiController(hikingController.getAll))
  /**
   * POST /api/hiking
   * @summary POST create one hiking
   * @tags Hiking
   * @security BearerAuth
   * @param {[Hiking]} request.body.required - hiking info
   * @return {json} 200 - success response - application/json
   * {
   * "id": 5
   * }
   * @example request - hiking info
  {
    "name": "rando test",
    "imgCard" : "https://upload.wikimedia.org/wikipedia/commons/7/78/Ch%C3%A8vre_naine_-_S%C3%A9rent_8.jpg",
    "mountain": "jura",
    "resume": "Une rando qui monte on test",
    "keyStage": "A/D: km 0 départ /n 1: km 3.2 tounre à gauche",
    "startingPoint": "45.88847701585252, 6.240168998430284",
    "hikingPlan" : "test",
    "positiveElevation": 1235,
    "negativeElevation": 42,
    "overallLength": 5.5,
    "landType": "Forestier",
    "ignCardReference": "Réf 987654321",
    "hightPoint": 2543,
    "lowPoint": 1000,
    "difficulty": "Très difficile",
    "userId": 1,
    "liftOffId": 3,
    "photos": [{"name": "photo rando test", "url": "https://idata.over-blog.com/2/08/31/84/gifs/cockpit-avion.jpg"},
      {"name": "photo rando test2", "url": "https://www.alibabuy.com/photos/library/1500/11681.jpg"}]
  }
   *@example response - 200 - Return json with the new id of the hiking
  {
    "id": 5
  }
   */
  .post(auth(), apiController(hikingController.create));

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
