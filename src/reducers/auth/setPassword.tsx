import { ActionTypes, SetPasswordAction } from "actions";

export interface SetPasswordState {
  isSettingPassword: boolean,
  setPasswordError: string | null,
}

const INITIAL_STATE: SetPasswordState = {
  isSettingPassword: false,
  setPasswordError: null,
};

export default (state: SetPasswordState = INITIAL_STATE, action: SetPasswordAction): SetPasswordState => {
  switch (action.type) {
    case ActionTypes.settingPassword:
      return { ...state, isSettingPassword: true, setPasswordError: null };
    case ActionTypes.setPasswordSuccess:
      return {
        ...state,
        isSettingPassword: false,
      };
    case ActionTypes.setPasswordFailed:
      return {
        ...state,
        isSettingPassword: false,
        setPasswordError: action.payload,
      };
    default:
      return state;
  }
};
