import { getRememberUsername, setAccessToken } from '~/utils/localStorage';

export const initialState = {
  login: {
    currentUser: null,
    error: false,
  },

  register: {
    username: null,
    error: false,
  },

  logout: {
    error: false,
  },
};

const authenReducer = (state, action) => {
  switch (action.type) {
    case 'loginSuccess':
      let username = null;
      if (getRememberUsername()) username = action.payload?.username;
      if (action.payload?.accessToken) setAccessToken(action.payload?.accessToken);
      return {
        ...state,
        login: {
          ...state.login,
          error: false,
          currentUser: action.payload,
        },
        register: {
          ...state.register,
          username: username,
        },
      };

    case 'loginFailed':
      return {
        ...state,
        login: {
          ...state.login,
          error: action.payload,
          currentUser: null,
        },
      };

    case 'registerSuccess':
      return {
        ...state,
        register: {
          username: action.payload,
          error: false,
        },
      };

    case 'registerFailed':
      return {
        ...state,
        register: {
          username: null,
          error: action.payload,
        },
      };

    case 'logoutSuccess':
      setAccessToken('');
      return {
        ...state,
        login: {
          ...state.login,
          currentUser: null,
        },
      };

    case 'logoutFailed':
      return {
        ...state,
        logout: {
          error: true,
        },
      };

    default:
      return state;
  }
};

export default authenReducer;
