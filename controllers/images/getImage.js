const gfs = require('./../../config/gfs');
const mongoose = require('mongoose');

gfs.collection('images');

module.exports = (req, res) => {
  const id = req.params.id;
  gfs.files.findOne({ _id: mongoose.Types.ObjectId(`${id}`) }, (err, file) => {
    if (!file || file.length === 0) return res.status(404).json({ err: 'No file exists' });
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).send('');
    }
  });
}