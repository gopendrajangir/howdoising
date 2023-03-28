import { LoggedInUser, ActionTypes, LogoutAction, LoginAction } from 'actions';

export interface LoginState {
  isLoggedIn: boolean,
  isLoggingIn: boolean,
  user: LoggedInUser | null,
  loginError: string | null,
  isLoggingOut: boolean,
  logoutError: string | null,
}

const INITIAL_STATE: LoginState = {
  isLoggedIn: false,
  isLoggingIn: false,
  user: null,
  loginError: null,
  isLoggingOut: false,
  logoutError: null,
};

export default (state: LoginState = INITIAL_STATE, action: LoginAction | LogoutAction): LoginState => {
  switch (action.type) {
    case ActionTypes.loggingIn:
      return { ...state, isLoggingIn: true, loginError: null };
    case ActionTypes.loginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        user: action.payload,
        loginError: null,
      };
    case ActionTypes.loginFailed:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        loginError: action.payload,
      };
    case ActionTypes.loggingOut:
      return { ...state, isLoggingOut: true };
    case ActionTypes.logoutSuccess:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingOut: false,
        user: null,
        logoutError: null,
      };
    case ActionTypes.logoutFailed:
      return { ...state, isLoggingOut: false, logoutError: action.payload };
    default:
      return state;
  }
};
