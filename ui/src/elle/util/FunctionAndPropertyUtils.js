let accessTokenProperty;
let setContextFunction;

export const setFunctionsAndProperties = (accessToken, setContext) => {
  accessTokenProperty = accessToken;
  setContextFunction = setContext;
};


export const getAccessToken = () => accessTokenProperty;

export const setContext = (isTokenRenewed) => setContextFunction(isTokenRenewed);
