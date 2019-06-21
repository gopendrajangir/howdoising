const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.displayname = !isEmpty(data.displayname) ? data.displayname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isLength(data.displayname, { min: 5, max: 15})) {
    errors.displayname = 'Display name must be between 5 and 15 characters';
  }

  if(Validator.isEmpty(data.displayname)) {
    errors.name = 'Display name field is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  
  if(!Validator.isLength(data.password, {min: 5, max: 25})) {
    errors.password = 'Password must be between 5 and 25 characters';
  }
  
  if(Validator.isEmpty(data.level)) {
    errors.level = 'Level field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  }
}