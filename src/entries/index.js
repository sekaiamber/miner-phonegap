import dva from 'dva';
import Clipboard from 'clipboard';
import router from './router';
import models from '../dashboard/models';
// import CONFIG from '../config';
import message from '../utils/message';
import './index.scss';

window.clipboard = new Clipboard('.clipboard-target');
window.clipboard.on('success', (e) => {
  message.success('複製成功');
  e.clearSelection();
});

window.clipboard.on('error', () => {
  message.success(window.i18n.copy_error);
});

function render() {
  const app = dva();
  Object.keys(models).forEach((key) => {
    app.model(models[key]);
  });
  app.router(router);
  app.start('#root');
  window._APP_ = app;
}

render();
