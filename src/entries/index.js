import '@babel/polyfill';
import '../utils/polyfill';
import dva from 'dva';
import Clipboard from 'clipboard';
import router from './router';
import models from '../dashboard/models';
// import CONFIG from '../config';
import message from '../utils/message';
import './index.scss';

import welcomeVideo from '../assets/welcome.mp4';

// 置localStorage初始值
if (!localStorage.getItem('member_id')) {
  localStorage.setItem('member_id', '__EMPTY__');
}
if (!localStorage.getItem('member_token')) {
  localStorage.setItem('member_token', '__EMPTY__');
}

window.clipboard = new Clipboard('.clipboard-target');
window.clipboard.on('success', (e) => {
  message.success('複製成功');
  e.clearSelection();
});

window.clipboard.on('error', () => {
  message.success(window.i18n.copy_error);
});

function render() {
  if (localStorage.getItem('member_id') === '__EMPTY__') {
    window.location.hash = '/login';
  }
  const app = dva();
  Object.keys(models).forEach((key) => {
    app.model(models[key]);
  });
  app.router(router);
  app.start('#root');
  window._APP_ = app;
}

// 播放影片
const { $ } = window;
$(() => {
  const v = $(`<video src="${welcomeVideo}" muted="muted" autoplay></video>`);
  $('#welcome').append(v);
  v[0].addEventListener('ended', () => {
    $('body').removeClass('welcome');
    $('#welcome').remove();
    render();
  }, true);
});
