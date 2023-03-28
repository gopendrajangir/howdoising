import Axios from 'axios';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';

import { api } from 'utils/apis';

import { ActionTypes } from '../types';
import { loginSuccess, LoginSuccessAction } from './login';

export interface ResettingPasswordAction {
  type: ActionTypes.resettingPassword
}

export interface ResetPasswordSuccessAction {
  type: ActionTypes.resetPasswordSuccess
}

export interface ResetPasswordFailedAction {
  type: ActionTypes.resetPasswordFailed;
  payload: string
}

export type ResetPasswordAction = ResettingPasswordAction | ResetPasswordSuccessAction | ResetPasswordFailedAction;

const resettingPassword: ResettingPasswordAction = {
  type: ActionTypes.resettingPassword,
};

const resetPasswordSuccess = (): ResetPasswordSuccessAction => {
  return {
    type: ActionTypes.resetPasswordSuccess,
  };
};

const resetPasswordFailed = (message: string): ResetPasswordFailedAction => {
  return {
    type: ActionTypes.resetPasswordFailed,
    payload: message,
  };
};

export const resetPassword = (token: string, data: FieldValues, setIsError: (flag: boolean) => void, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ResettingPasswordAction>(resettingPassword);
      const fetchedData = await Axios.patch(
        `${api}/users/resetPassword/${token}`,
        data
      );

      if (fetchedData && fetchedData.data && fetchedData.data.data) {
        const user = fetchedData.data.data;
        dispatch<ResetPasswordSuccessAction>(resetPasswordSuccess());
        dispatch<LoginSuccessAction>(loginSuccess(user));
        navigate('/');
      }
    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<ResetPasswordFailedAction>(resetPasswordFailed(err.response.data.message));
      } else {
        dispatch<ResetPasswordFailedAction>(resetPasswordFailed("Some error occurred"));
      }
      setIsError(true);
    }
  };
};
