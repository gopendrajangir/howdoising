module.exports = (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
}