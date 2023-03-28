import { Dispatch } from 'redux';
import Axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

import { ActionTypes } from '../types';

import { api } from 'utils/apis';
import { FieldValues } from 'react-hook-form';

export interface SigningUpAction {
  type: ActionTypes.signingUp
}

export interface SignupSuccessAction {
  type: ActionTypes.signupSuccess
}

export interface SignupFailedAction {
  type: ActionTypes.signupFailed;
  payload: string
}

export type SignupAction = SigningUpAction | SignupSuccessAction | SignupFailedAction;

const signingUp: SigningUpAction = {
  type: ActionTypes.signingUp
};

const signupSuccess = (): SignupSuccessAction => {
  return {
    type: ActionTypes.signupSuccess
  };
};

const signupFailed = (message: string): SignupFailedAction => {
  return {
    type: ActionTypes.signupFailed,
    payload: message,
  };
};

export const signupUser = (data: FieldValues, setIsError: (flag: boolean) => void, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SigningUpAction>(signingUp);
      await Axios.post(`${api}/users/signup`, data);
      navigate('/sentEmailVerificationLink', { state: { fromSignup: true } });
      dispatch<SignupSuccessAction>(signupSuccess());
    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SignupFailedAction>(signupFailed(err.response.data.message));
      } else {
        dispatch<SignupFailedAction>(signupFailed("Some error occurred"));
      }
      setIsError(true);
    }
  };
};
