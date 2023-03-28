import { ActionTypes, SignupAction } from 'actions';

export interface SignupState {
  isSigningUp: boolean,
  signupError: string | null
}

const INITIAL_STATE: SignupState = {
  isSigningUp: false,
  signupError: null,
};

export default (state: SignupState = INITIAL_STATE, action: SignupAction): SignupState => {
  switch (action.type) {
    case ActionTypes.signingUp:
      return { ...state, isSigningUp: true, signupError: null };
    case ActionTypes.signupSuccess:
      return {
        ...state,
        isSigningUp: false,
        signupError: null,
      };
    case ActionTypes.signupFailed:
      return {
        ...state,
        isSigningUp: false,
        signupError: action.payload,
      };
    default:
      return state;
  }
};
