import types from './types';
const apiUrl =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4000/';

export const handleChange = e => {
  return {
    type: types.HANDLE_CHANGE,
    field: e.target.name,
    value: e.target.value
  };
};

export const initSend = () => {
  return {
    type: types.INIT_LOGIN
  };
};

export const sendSuccess = () => {
  return {
    type: types.LOGIN_SUCCESS
  };
};

export const sendFailure = error => {
  return {
    type: types.LOGIN_FAILURE,
    error: error
  };
};

export const send = (e, name, email, message) => {
  e.preventDefault();
  return dispatch => {
    dispatch(initSend());
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message
      })
    };
    return fetch(`${apiUrl}create-message`, params)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(res => {
        if (res.ok) {
          dispatch(sendSuccess());
        } else {
          dispatch(sendFailure(res.error));
        }
      });
  };
};

export default {
  handleChange,
  initSend,
  sendSuccess,
  sendFailure,
  send
};