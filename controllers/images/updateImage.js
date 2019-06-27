const User = require('./../../models/User');
const deleteImageById = require('./../../utils/deleteImageById');

module.exports = (req, res) => {
  
  const prevImageId = req.params.id;

  let currentImageId;

  if(req.file) {
    currentImageId = req.file.id;
  }
  const userId = req.user.uid;

  const image = {};

  if(req.file) {
    image.$ref = "images.files";
    image.$id = currentImageId;
  } else {
    image.$ref = "images.files";
    image.$id = prevImageId;
  }

  User.findOneAndUpdate({_id: userId}, { $set: { image } }, {new: true}, (err, user) => {
    if (err) {
      console.log("Error in user find one and update at update image route", err);
      if(req.file) {
        deleteImageById(currentImageId);
      }
      return res.status(500).send("Internal Server Error");
    }
    if(!user) {
      if(req.file) {
        deleteImageById(currentImageId);
      }
      return res.status(404).json({
        msg: "User not found"
      });
    }
    if(image.$id === currentImageId) {
      deleteImageById(prevImageId);
    }
    return res.status(200).json({ user });
  });
}