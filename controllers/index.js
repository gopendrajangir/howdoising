exports.register = require('./users/register');
exports.login = require('./users/login');
exports.logout = require('./users/logout');
exports.sessions = require('./users/sessions');
exports.sessionLogout = require('./users/sessionLogout');
exports.privateProfile = require('./users/privateProfile');

exports.connector = require('./connector');

exports.getImage = require('./images/getImage');
exports.updateImage = require('./images/updateImage');