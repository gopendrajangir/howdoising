import { Dispatch } from 'redux';
import Axios from 'axios';

import { Recording, ActionTypes } from './types';

import { api } from 'utils/apis';

export interface FetchRecordingLoadingAction {
  type: ActionTypes.fetchRecordingLoading
}

export interface FetchRecordingSuccessAction {
  type: ActionTypes.fetchRecordingSuccess;
  payload: Recording
}

export interface FetchRecordingFailedAction {
  type: ActionTypes.fetchRecordingFailed;
  payload: string
}

export type RecordingAction = FetchRecordingLoadingAction | FetchRecordingSuccessAction | FetchRecordingFailedAction;

const fetchRecordingLoading: FetchRecordingLoadingAction = {
  type: ActionTypes.fetchRecordingLoading,
};

export const fetchRecordingSuccess = (data: Recording): FetchRecordingSuccessAction => {
  return {
    type: ActionTypes.fetchRecordingSuccess,
    payload: data,
  };
};

export const fetchRecordingFailed = (error: string): FetchRecordingFailedAction => {
  return {
    type: ActionTypes.fetchRecordingFailed,
    payload: error,
  };
};

export const fetchRecording = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchRecordingLoadingAction>(fetchRecordingLoading);
    try {
      const response = await Axios.get(`${api}/recordings/${id}`);

      if (response && response.data && response.data.data) {
        dispatch<FetchRecordingSuccessAction>(fetchRecordingSuccess(response.data.data));
      }
    } catch (err: any) {
      dispatch<FetchRecordingFailedAction>(fetchRecordingFailed(err.message));
    }
  };
};
