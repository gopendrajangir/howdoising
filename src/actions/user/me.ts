import { Dispatch } from 'redux';
import Axios from 'axios';

import { api } from 'utils/apis';
import { ActionTypes, UserMe } from '../types';

export interface FetchMeLoadingAction {
  type: ActionTypes.fetchMeLoading
}

export interface FetchMeSuccessAction {
  type: ActionTypes.fetchMeSuccess;
  payload: UserMe
}

export interface FetchMeFailedAction {
  type: ActionTypes.fetchMeFailed,
  payload: string
}

export type MeAction = FetchMeLoadingAction | FetchMeSuccessAction | FetchMeFailedAction;

const fetchMeLoading: FetchMeLoadingAction = {
  type: ActionTypes.fetchMeLoading,
};

export const fetchMeSuccess = (data: UserMe): FetchMeSuccessAction => {
  return {
    type: ActionTypes.fetchMeSuccess,
    payload: data
  };
};

const fetchMeFailed = (error: string): FetchMeFailedAction => {
  return {
    type: ActionTypes.fetchMeFailed,
    payload: error,
  };
};

export const fetchMe = () => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchMeLoadingAction>(fetchMeLoading);
    try {
      const response = await Axios.get(`${api}/users/me`, {
        withCredentials: true
      });
      dispatch<FetchMeSuccessAction>(fetchMeSuccess(response.data.data));
    } catch (err: any) {
      dispatch<FetchMeFailedAction>(fetchMeFailed(err.message));
    }
  };
};
