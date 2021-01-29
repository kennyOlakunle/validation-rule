const controllers = require('../controllers');

const routes = (controllers) => (app) => {
  app.get('/', controllers.get_profile);

  app.post('/validate-rule', controllers.validate_rule);
};

module.exports = routes(controllers);
