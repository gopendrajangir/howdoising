import Axios from 'axios';
import { StoreState } from 'reducers';
import { Dispatch } from 'redux';
import { api } from 'utils/apis';

import { ActionTypes, HomeRecording } from './types';

export interface FetchRecordingsLoadingAction {
  type: ActionTypes.fetchRecordingsLoading
}

export interface FetchRecordingsSuccessAction {
  type: ActionTypes.fetchRecordingsSuccess,
  payload: HomeRecording[]
}

export interface FetchRecordingsFailedAction {
  type: ActionTypes.fetchRecordingsFailed,
  payload: string
}

export type RecordingsAction = FetchRecordingsLoadingAction | FetchRecordingsSuccessAction | FetchRecordingsFailedAction;

const fetchRecordingsLoading: FetchRecordingsLoadingAction = {
  type: ActionTypes.fetchRecordingsLoading,
};

export const fetchRecordingsSuccess = (data: HomeRecording[]): FetchRecordingsSuccessAction => {
  return {
    type: ActionTypes.fetchRecordingsSuccess,
    payload: data,
  };
};

const fetchRecordingsFailed = (error: string): FetchRecordingsFailedAction => {
  return {
    type: ActionTypes.fetchRecordingsFailed,
    payload: error,
  };
};

export const fetchRecordings = (all?: true) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      const { recordings: { data: recordings } }: StoreState = getState();

      const date = recordings[0]?.createdAt;

      if (date) {
        const response = await Axios.get(`${api}/recordings?createdAt[gt]=${date}`, { withCredentials: true, });
        const newRecordings: HomeRecording[] = [...response.data.data, ...recordings];
        dispatch<FetchRecordingsSuccessAction>(fetchRecordingsSuccess(newRecordings));
      } else {
        dispatch<FetchRecordingsLoadingAction>(fetchRecordingsLoading);
        const response = await Axios.get(`${api}/recordings`, { withCredentials: true, });
        if (response && response.data && response.data.data) {
          dispatch<FetchRecordingsSuccessAction>(fetchRecordingsSuccess(response.data.data));
        }
      }

    } catch (err: any) {
      dispatch<FetchRecordingsFailedAction>(fetchRecordingsFailed(err.message));
    }
  };
};
