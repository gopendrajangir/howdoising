const router = require('express').Router();

const users = require('./users');
const images = require('./images');
const connector = require('./connector');

router.use('/users', users);
router.use('/images', images);

router.use('/connector', connector);
module.exports = router;