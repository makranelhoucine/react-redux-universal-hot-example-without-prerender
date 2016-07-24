import { executionEnvironment } from 'utils/helpers';

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

const initialState = {
  loading: false,
  loaded: false,
  loggingIn: false,
  loggingOut: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {...state, loading: true};
    case LOAD_SUCCESS:
      return {...state, loading: false, loaded: true, user: action.result.data.user };
    case LOAD_FAIL:
      return {...state, loading: false, loaded: false};
    case LOGOUT:
      return {...state, loggingOut: true};
    case LOGOUT_SUCCESS:
      return initialState;
    case LOGOUT_FAIL:
      return {...state, loggingOut: false };
    default:
      return state;
  }
}

export function isLoaded(store) {
  return !!store.auth && !!store.auth.user;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () =>
      new Promise((resolve, reject) => {
        if (executionEnvironment().canUseDOM) {
          return resolve({
            data: {
              user: {}
            }
          });
        }
        return reject();
      })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () =>
      new Promise((resolve, reject) => {
        if (executionEnvironment().canUseDOM) {
          return resolve();
        }
        return reject();
      })
  };
}


