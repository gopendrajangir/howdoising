
module.exports = (gfs, id) => {
  gfs.remove({ _id: id }, (err, gridStore) => {
    if(err) {
      console.log(err);
    }
  });
}