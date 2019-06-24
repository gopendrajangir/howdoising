const router = require('express').Router();
const controllers = require('./../../controllers');
const uploadImage = require('./../../middlewares/multer').uploadImage;
const inputValidationMiddleware = require('./../../middlewares/inputValidationMiddleware');
const authRouteMiddleware = require('../../middlewares/authMiddleware').authRouteMiddleware;
const protectedRouteMiddleware = require('../../middlewares/authMiddleware').protectedRouteMiddleware;

router.route('/register')
  .post(authRouteMiddleware, uploadImage.single('image'), controllers.register);

router.route('/login')
  .post(authRouteMiddleware, inputValidationMiddleware, controllers.login);

router.route('/logout')
  .get(protectedRouteMiddleware, controllers.logout);

router.route('/sessions')
  .get(protectedRouteMiddleware, controllers.sessions);

router.route('/session/logout/:id')
  .get(authRouteMiddleware, controllers.sessionLogout);

module.exports = router;