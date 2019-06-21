const router = require('express').Router();
const controllers = require('./../../controllers');

router.route('/')
  .get(controllers.connector);

module.exports = router;