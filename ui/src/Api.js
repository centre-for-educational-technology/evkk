const handleResponsePromise = async (type, result, dispatch) => {
  dispatch({type: `${type}_INIT`});
  try {
    const response = await result;
    const json = await response.json();
    dispatch({type: `${type}_SUCCESS`, data: json});
  } catch (ex) {
    console.error("Request failed", ex);
    dispatch({type: `${type}_ERROR`, error: ex});
  } finally {
    dispatch({type: `${type}_DONE`});
  }
  return result;
};

export const postLogin = (emailAddress, password) => {
  const formData = new FormData();
  formData.append("username", emailAddress);
  formData.append("password", password);
  return fetch('/api/login', {body: formData, method: 'POST'});
};

export const postMinitornPikkus = (input) => {
  const asString = JSON.stringify({input});
  return fetch('/api/tools/minitorn-pikkus', {
    body: asString,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;UTF-8',
    }
  });
};

export const postMasinoppeEnnustus = (input) => {
  const asString = JSON.stringify({input});
  return fetch('/api/tools/masinoppe-ennustus', {
    body: asString,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;UTF-8',
    }
  });
};

export const postUserFile = (files) => dispatch => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) formData.append("file", files[i]);
  const result = fetch('/api/user/file', {body: formData, method: 'POST'});
  return handleResponsePromise('POST_USER_FILE', result, dispatch);
};

export const getUserFiles = () => dispatch => {
  const result = fetch('/api/user/file', {method: 'GET'});
  return handleResponsePromise('GET_USER_FILES', result, dispatch);
};
