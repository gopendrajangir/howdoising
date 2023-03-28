import { HomeRecording, ActionTypes, SearchAction } from 'actions';

export interface SearchState {
  loading: boolean;
  data: HomeRecording[];
  error: string | null
}

const INITIAL_STATE: SearchState = {
  loading: false,
  data: [],
  error: null,
};

export default (
  state: SearchState = INITIAL_STATE,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case ActionTypes.searchRecordingsLoading:
      return { ...state, data: [], loading: true, error: null };
    case ActionTypes.searchRecordingsSuccess:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.searchRecordingsFailed:
      return { ...state, data: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
