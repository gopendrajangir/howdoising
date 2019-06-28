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

router.route('/private/profile/:id')
  .get(protectedRouteMiddleware, controllers.privateProfile);

router.route('/private/profile/privacy')
  .post(protectedRouteMiddleware, controllers.changePrivacy);

router.route('/private/profile/displayname')
  .post(protectedRouteMiddleware, controllers.changeDisplayName);

router.route('/private/profile/verify')
  .post(protectedRouteMiddleware, controllers.verifyAccountByEmail);

router.route('/verifyAccount')
  .get(protectedRouteMiddleware, controllers.sendVerifyAccountMail);
  
router.route('/verifyAccount')
  .get(protectedRouteMiddleware, controllers.sendVerifyAccountMail);

router.route('/verifyAccount/:token')
  .get(protectedRouteMiddleware, controllers.verifyAccountWithToken);

router.route('/session/logout/:id')
  .get(protectedRouteMiddleware, controllers.sessionLogout);

module.exports = router;