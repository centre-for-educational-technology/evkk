import {EMPTY_OBJECT, freezeIfNeeded, isDefined} from './js-utils';
import {connect} from 'react-redux';
import {compose as reduxCompose} from 'redux';

const INITIAL_STATE_ACTION = 'INIT';

const getType = (state, action, spec) => {
  if (!isDefined(state)) {
    if (!spec[INITIAL_STATE_ACTION]) {
      throw new Error('Missing initial state!');
    }
    return INITIAL_STATE_ACTION;
  } else {
    return action.type;
  }
};

export const createReducer = (spec) => (state, action) => {
  const type = getType(state, action, spec);
  const fnc = spec[type];
  if (!fnc) return state;
  const nextState = fnc(state, action);
  return freezeIfNeeded(nextState);
};

const DEFAULT_MAP_STATE_TO_PROPS = () => EMPTY_OBJECT;
const DEFAULT_MAP_DISPATCH_TO_PROPS = EMPTY_OBJECT;

export const connectedComponent = (component, mapStateToProps = DEFAULT_MAP_STATE_TO_PROPS, mapDispatchToProps = DEFAULT_MAP_DISPATCH_TO_PROPS, options) =>
  connect(mapStateToProps, mapDispatchToProps, null, options)(component);

// noinspection JSUnresolvedVariable
export const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
