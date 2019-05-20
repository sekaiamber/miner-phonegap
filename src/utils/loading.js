import './loading.scss';
import message from './message';

export function loading(msg = '請稍等') {
  message.info(4);
  let $c = document.getElementById('loading');
  if (!$c) {
    $c = document.createElement('div');
    $c.id = 'loading';
    document.body.appendChild($c);
  }
  $c.innerHTML = `<span>${msg}</span>`;
  message.info(5);
}

export function removeLoading() {
  const $c = document.getElementById('loading');
  if ($c) {
    $c.remove();
  }
}
