export function registerSuccess(payload) {
  return {
    type: 'registerSuccess',
    payload,
  };
}

export function registerFailed(payload) {
  return {
    type: 'registerFailed',
    payload: payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: 'loginSuccess',
    payload,
  };
}

export function loginFailed(payload) {
  return {
    type: 'loginFailed',
    payload: payload,
  };
}

export function logoutSuccess(payload) {
  return {
    type: 'logoutSuccess',
    payload,
  };
}

export function logoutFailed() {
  return {
    type: 'logoutFailed',
  };
}
