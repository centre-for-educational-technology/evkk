let navigateFunction;
let clearAuthContextFunction;
let accessTokenProperty;
let setContextFunction;

export const setFunctionsAndProperties = (navigate, clearAuthContext, accessToken, setContext) => {
  navigateFunction = navigate;
  clearAuthContextFunction = clearAuthContext;
  accessTokenProperty = accessToken;
  setContextFunction = setContext;
};


export const navigateTo = (path) => {
  navigateFunction(path);
  window.scrollTo(0, 0);
};

export const clearAuthContext = () => {
  clearAuthContextFunction();
};

export const getAccessToken = () => {
  return accessTokenProperty;
};

export const setContext = (isTokenRenewed) => {
  setContextFunction(isTokenRenewed);
};
