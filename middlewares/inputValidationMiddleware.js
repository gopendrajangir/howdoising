const validateLoginInput = require('./../validation/login');

module.exports = (req, res, next) => {
  const { isValid, errors } = validateLoginInput(req.body);

  if(isValid) {
    next();
  } else {
    res.status(422).json({ errors });
  }
}