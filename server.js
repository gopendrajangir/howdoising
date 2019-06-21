const app = require('./bin/www').app;

require('./middlewares/appMiddlewares')(app);