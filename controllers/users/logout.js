module.exports = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if(err) {
      console.log("Error in session destroy at logout route", err);
      return res.status(500).send("Internal Server Error");
    }
    return res.status(200).json({
      msg: "You logged out successfully"
    });
  })
}