import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
  api.post('/users', UsersController.postNew);
  api.get('/connect', AuthController.getConnect);
  api.get('/disconnect', AuthController.getDisconnect);
  api.get('/users/me', UserController.getMe);
};

module.exports = injectRoutes;
