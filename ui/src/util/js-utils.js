export const EMPTY_ARRAY = Object.freeze([]);
export const EMPTY_OBJECT = Object.freeze({});
export const UNDEFINED = void 0;

export const isUndefined = (candidate) => candidate === UNDEFINED;
export const isDefined = (candidate) => candidate !== UNDEFINED;
export const isArray = Array.isArray;

const getOwnPropertyNames = (obj) => {
  if (obj === null || isUndefined(obj)) {
    return EMPTY_ARRAY;
  }
  return Object.getOwnPropertyNames(obj);
};

const freezeIfNotFrozen = (obj) => {
  if (!Object.isFrozen(obj)) {
    Object.freeze(obj);
  }
};

export const freezeRecursive = (obj) => {
  freezeIfNotFrozen(obj);
  getOwnPropertyNames(obj).forEach(propertyName => {
    const property = obj[propertyName];
    if (Object.isExtensible(property)) {
      freezeRecursive(property);
    }
  });
  return obj;
};

const isProductionEnvironment = process.env.NODE_ENV === 'production';

export const freezeIfNeeded = obj => isProductionEnvironment ? obj : freezeRecursive(obj);
