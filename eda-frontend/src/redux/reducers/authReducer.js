import * as actions from '../actions/actions'

const initialState = {
  token: localStorage.getItem('esim_token'),
  isAuthenticated: null,
  isRegistered: null,
  isLoading: false,
  user: null,
  errors: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }

    case actions.SIGNUP_SUCCESSFUL: {
      return {
        ...state,
        isRegistered: true
      }
    }

    case actions.USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      }
    }

    case actions.LOGIN_SUCCESSFUL: {
      localStorage.setItem('esim_token', action.payload.data.auth_token)
      return {
        ...state,
        token: action.payload.data.auth_token,
        // ...action.payload.data,
        // isAuthenticated: true,
        // isLoading: false,
        errors: null
      }
    }

    case actions.LOADING_FAILED: {
      return {
        ...state,
        isLoading: false
      }
    }

    case actions.AUTHENTICATION_ERROR:
    case actions.LOGIN_FAILED:
    case actions.LOGOUT_SUCCESSFUL: {
      localStorage.removeItem('esim_token')
      return {
        ...state,
        errors: action.payload.data,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    }

    default:
      return state
  }
}