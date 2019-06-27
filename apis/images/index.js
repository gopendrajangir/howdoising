const router = require('express').Router();
const controllers = require('./../../controllers');
const uploadImage = require('./../../middlewares/multer').uploadImage;
const protectedRouteMiddleware = require('../../middlewares/authMiddleware').protectedRouteMiddleware;

router.route('/:id')
  .get(controllers.getImage)
  .post(protectedRouteMiddleware, uploadImage.single('image'), controllers.updateImage);

module.exports = router;