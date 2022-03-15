const express = require('express');
const apiController = require('../helpers/apiController');

const router = express.Router();

const landingController = require('../controllers/landing.controllers');
const auth = require('../helpers/auth.helpers');

// id
router.route('/:id(\\d+)')
  /**
   * GET /api/landing/{id}
   * @summary Get one landing with the associated photo(s) on the id
   * @tags Landing
   * @return {[Landing]} 200 - success response - application/json
   * @param {number} id.path - id of the hiking
   */
  .get(apiController(landingController.getOne))
  /**
   * PATCH /api/landing/{id}
   * @summary PATH one landing on the id
   * @tags Landing
   * @return {[Landing]} 200 - success response - application/json
   * @param {number} id.path - id of the landing
   * @param {landing} request.body.required - landing info
   */
  .patch(auth(), apiController(landingController.patch));

// all
router.route('/')
  /**
  * GET /api/landing
  * @summary Get all landing
  * @tags Landing
  * @return {[Landing]} 200 - success response - application/json
  */
  .get(apiController(landingController.getAll))
  /**
  * POST /api/landing
  * @summary POST create one landing
  * @tags Landing
  * @security BearerAuth
  * @param {[Landing]} request.body.required - landing info
  * @return {Landing} 200 - success response - application/json
    @example request - landing info
  {
      "name":"new landing",
      "typeOfTerrain":"new type de terrain",
      "description":"new description",
      "danger":"new danger",
      "fflvLink":"new fflvLink",
      "latitude":23.234,
      "longitude":34.23,
      "favorableWind":"O",
      "unfavorableWind":"O",
      "altitude":2313,
      "photo_landing": "'name': 'update photo  test2', 'url': 'https://idata.over-blog.com/2/08/31/84/gifs/cockpit-avion.jpg', 'name': 'update photo rasdfsdfndo test', 'url': 'https://idata.over-blog.com/image.jpg', 'name': 'Oliv3', 'url': 'https://idata.over-blog.com/Olivier_url.jpg'"
  }
   *@example response - 200 - Return json with the new id of the landing
  {
    "id": 5
  }
  */
  .post(auth(), apiController(landingController.create));

router.use((_req, res) => {
  res.status(404).json({ message: 'page not found' });
});

module.exports = router;
