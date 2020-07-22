// 자료형 체크
export const isDefined = (obj) => {
  return !(obj === null || typeof obj === 'undefined');
};
export const isBoolean = (obj) => {
  if (!isDefined(obj)) return false;

  return obj.constructor === Boolean;
};
export const isNumber = (obj) => {
  if (!isDefined(obj)) return false;

  return !isNaN(obj) && obj.constructor === Number;
};
export const isInteger = (obj) => {
  if (!isNumber(obj)) return false;

  return isFinite(obj) && Math.floor(obj) === obj;
};
export const isString = (obj) => {
  if (!isDefined(obj)) return false;

  return obj.constructor === String;
};
export const isArray = (obj) => {
  if (!isDefined(obj)) return false;

  return obj.constructor === Array;
};
export const isFunction = (obj) => {
  if (!isDefined(obj)) return false;

  return obj.constructor === Function;
};
export const isObject = (obj) => {
  if (!isDefined(obj)) return false;

  return obj.constructor === Object;
};

// 쿠키 제어
export const setCookie = (name, value, expiredays = 99999) => {
  const date = new Date();
  date.setDate(date.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString() + ';path=/';
};

export const getCookie = (name) => {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

export const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// 클립보드 복사
export const copyTextToClipboard = (text, doneCallback = null, failCallback = null) => {
  if (isDefined(doneCallback) && !isFunction(doneCallback))
    throw TypeError('doneCallback parameter type of copyTextToClipboard() must be undefined or null or Function.');
  if (isDefined(failCallback) && !isFunction(failCallback))
    throw TypeError('failCallback parameter type of copyTextToClipboard() must be undefined or null or Function.');

  if (!navigator.clipboard) {
    copyTextToClipboardFallback(text, doneCallback, failCallback);
  } else {
    navigator.clipboard.writeText(text).then(
      () => {
        doneCallback.call(null, text);
      },
      error => {
        failCallback.call(null, error);
      }
    );
  }
};
export const copyTextToClipboardFallback = (text, doneCallback = null, failCallback = null) => {
  if (isDefined(doneCallback) && !isFunction(doneCallback))
    throw TypeError('doneCallback parameter type of copyTextToClipboardFallback() must be undefined or null or Function.');
  if (isDefined(failCallback) && !isFunction(failCallback))
    throw TypeError('failCallback parameter type of copyTextToClipboardFallback() must be undefined or null or Function.');

  const textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.classList.add('shareUrlArea');
  window.getSelection().removeAllRanges();

  let urlField = document.querySelector('.shareUrlArea');
  let range = document.createRange();

  range.selectNode(urlField);
  window.getSelection().addRange(range);

  try {
    const isSuccessCopy = document.execCommand('copy');
    if (isSuccessCopy) {
      if (doneCallback) doneCallback.call(null, text);
      return;
    }

    if (failCallback) failCallback.call(null, new Error(''));
  } catch (error) {
    if (failCallback) failCallback.call(null, error);
  }

  document.body.removeChild(textArea);
};

// 쿼리스트링 파싱
export function parseQueryString (query) {
  if (query === '') return {};

  const vars = query.split('&');
  const queryString = {};

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);

    if (typeof queryString[key] === 'undefined') {
      queryString[key] = decodeURIComponent(value);
    } else if (typeof queryString[key] === 'string') {
      queryString[key] = [queryString[key], decodeURIComponent(value)];
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
}
