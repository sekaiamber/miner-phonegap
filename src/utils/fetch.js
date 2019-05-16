import qs from 'qs';
import message from './message';
import jwt from './jwt';
import '../assets/fetch';

// const $token = document.querySelector('meta[name=csrf-token]');
// let token = '';
// if ($token) {
//   token = $token.getAttribute('content');
// }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const { status, statusText } = response;
  throw new Error(`[${status}] ${statusText}`);
}

function parseJSON(response) {
  return response.json();
}

function processData(data) {
  if (data.success === false) {
    data.errors.forEach(e => message.error(e.message ? e.message : e));
  }
  return data;
}

function catchError(error) {
  if (error.message.slice(1, 4) !== '401') message.error(error.message);
  return {
    success: false,
  };
}

const fetchlib = window.fetch;

function getHeader() {
  return {
    'X-App-Key': jwt.getKey(),
    'X-App-Auth': jwt.getPublicToken(),
    'Content-Type': 'application/json',
  };
}

const fetch = {
  post(url, data, options = {}, form = false) {
    let body;
    if (form) {
      data.append('locale', window.locale);
      body = data;
    } else {
      body = JSON.stringify({
        // utf8: '✓',
        locale: window.locale,
        ...data,
      });
    }
    return fetchlib(url, {
      headers: getHeader(),
      ...options,
      body,
      method: 'POST',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  put(url, data, options = {}, form = false) {
    let body;
    if (form) {
      data.append('locale', window.locale);
      body = data;
    } else {
      body = JSON.stringify({
        // utf8: '✓',
        ...data,
        locale: window.locale,
      });
    }
    return fetchlib(url, {
      headers: getHeader(),
      ...options,
      body,
      method: 'PUT',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  delete(url, options = {}) {
    return fetchlib(url, {
      headers: getHeader(),
      ...options,
      method: 'DELETE',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  get(url, data, options = {}) {
    let queryUrl = url;
    const params = data ? qs.stringify({ ...data, locale: window.locale }) : qs.stringify({ locale: window.locale });
    queryUrl += '?' + params;
    return fetchlib(queryUrl, {
      headers: getHeader(),
      credentials: 'include',
      ...options,
      method: 'GET',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
};

export default fetch;
