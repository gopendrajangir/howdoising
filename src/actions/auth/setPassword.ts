import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import Axios from 'axios';

import { api } from 'utils/apis'
  ;
import { ActionTypes, SetPasswordRequestBody } from '../types';
import { loginSuccess, LoginSuccessAction } from './login';
import { FieldValues } from 'react-hook-form';

export interface SettingPasswordAction {
  type: ActionTypes.settingPassword
}

export interface SetPasswordSuccessAction {
  type: ActionTypes.setPasswordSuccess
}

export interface SetPasswordFailedAction {
  type: ActionTypes.setPasswordFailed;
  payload: string
}

export type SetPasswordAction = SettingPasswordAction | SetPasswordSuccessAction | SetPasswordFailedAction;

const settingPassword: SettingPasswordAction = {
  type: ActionTypes.settingPassword,
};

const setPasswordSuccess = (): SetPasswordSuccessAction => {
  return {
    type: ActionTypes.setPasswordSuccess,
  };
};

const setPasswordFailed = (message: string): SetPasswordFailedAction => {
  return {
    type: ActionTypes.setPasswordFailed,
    payload: message,
  };
};


export const setPassword = (token: string, data: FieldValues, setIsError: (flag: boolean) => void, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SettingPasswordAction>(settingPassword);
      const fetchedData = await Axios.patch(
        `${api}/users/verify/${token}`,
        data,
        { withCredentials: true }
      );

      if (fetchedData && fetchedData.data && fetchedData.data.data) {
        const user = fetchedData.data.data;
        dispatch<SetPasswordSuccessAction>(setPasswordSuccess());
        dispatch<LoginSuccessAction>(loginSuccess(user));
        navigate('/');
      }
    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetPasswordFailedAction>(setPasswordFailed(err.response.data.message));
      } else {
        dispatch<SetPasswordFailedAction>(setPasswordFailed("Some error occurred"));
      }
      setIsError(true);
    }
  };
};
