import Axios from 'axios';

import { HomeRecording, ActionTypes } from './types';

import { api } from 'utils/apis';
import { Dispatch } from 'redux';

interface SearchRecordingsLoadingAction {
  type: ActionTypes.searchRecordingsLoading
}

interface SearchRecordingsSuccessAction {
  type: ActionTypes.searchRecordingsSuccess;
  payload: HomeRecording[]
}

interface SearchRecordingsFailedAction {
  type: ActionTypes.searchRecordingsFailed;
  payload: string
}

export type SearchAction = SearchRecordingsLoadingAction | SearchRecordingsSuccessAction | SearchRecordingsFailedAction;

const searchRecordingsLoading: SearchRecordingsLoadingAction = {
  type: ActionTypes.searchRecordingsLoading
};

export const searchRecordingsSuccess = (data: HomeRecording[]): SearchRecordingsSuccessAction => {
  return {
    type: ActionTypes.searchRecordingsSuccess,
    payload: data,
  };
};

const searchRecordingsFailed = (error: string): SearchRecordingsFailedAction => {
  return {
    type: ActionTypes.searchRecordingsFailed,
    payload: error,
  };
};

export const searchRecordings = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<SearchRecordingsLoadingAction>(searchRecordingsLoading);
    try {
      const response = await Axios.get(`${api}/recordings?search=${query}`, { withCredentials: true, });
      dispatch<SearchRecordingsSuccessAction>(searchRecordingsSuccess(response.data.data));
    } catch (err: any) {
      dispatch<SearchRecordingsFailedAction>(searchRecordingsFailed(err.message));
    }
  };
};
