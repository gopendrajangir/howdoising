import { ActionTypes, ResetPasswordAction } from "actions";

export interface ResetPasswordState {
  isResettingPassword: boolean,
  resetPasswordError: string | null,
}

const INITIAL_STATE: ResetPasswordState = {
  isResettingPassword: false,
  resetPasswordError: null,
};

export default (state: ResetPasswordState = INITIAL_STATE, action: ResetPasswordAction): ResetPasswordState => {
  switch (action.type) {
    case ActionTypes.resettingPassword:
      return { ...state, isResettingPassword: true, resetPasswordError: null };
    case ActionTypes.resetPasswordSuccess:
      return {
        ...state,
        isResettingPassword: false,
      };
    case ActionTypes.resetPasswordFailed:
      return {
        ...state,
        isResettingPassword: false,
        resetPasswordError: action.payload,
      };
    default:
      return state;
  }
};
