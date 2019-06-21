const router = require('express').Router();
const controllers = require('./../../controllers');

router.route('/:id')
  .get(controllers.getImage);

module.exports = router;