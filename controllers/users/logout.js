module.exports = (req, res) => {
  req.logout((err) => {
    if(err) {
      console.log("Error in req session destory at logout route", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).json({
      msg: "You logged out successfully"
    });
  });
}