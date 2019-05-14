import dva from 'dva';
import router from './router';
import models from '../dashboard/models';
import CONFIG from '../config';
import './index.scss';


function render() {
  const app = dva();
  Object.keys(models).forEach((key) => {
    app.model(models[key]);
  });
  app.router(router);
  app.start('#root');
}

render();
