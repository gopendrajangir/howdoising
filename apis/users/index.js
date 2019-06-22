const router = require('express').Router();
const controllers = require('./../../controllers');
const uploadImage = require('./../../middlewares/multer').uploadImage;
const inputValidationMiddleware = require('./../../middlewares/inputValidationMiddleware');

router.route('/register')
  .post(uploadImage.single('image'), controllers.register);

router.route('/login')
  .post(inputValidationMiddleware, controllers.login);

router.route('/logout')
  .get(controllers.logout);

router.route('/session/logout/:id')
  .get(controllers.sessionLogout);

module.exports = router;