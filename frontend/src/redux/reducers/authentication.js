import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "../actions/authentication";

export const authState = {
  login: {
    loading: false,
    success: false,
    error: null,
  },
  signup: {
    loading: false,
    success: false,
    error: null,
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
        login: {
          ...state.auth,
          loading: true,
          error: null,
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.auth,
          success: true,
          loading: false,
        },
        error: null,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.auth,
          loading: false,
          error: action.payload,
        },
      };

      case SIGNUP_INIT:
        return {
          ...state,
          login: {
            ...state.auth,
            loading: true,
            error: null,
          },
        };
  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          login: {
            ...state.auth,
            success: true,
            loading: false,
          },
          error: null,
        };

      case SIGNUP_ERROR:
        return {
          ...state,
          login: {
            ...state.auth,
            loading: false,
            error: action.payload,
          },
        };

    default:
      return state;
  }
};
