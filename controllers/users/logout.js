module.exports = (req, res) => {
  req.logout();
  res.status(200).json({
    msg: "You logged out successfully"
  });
}