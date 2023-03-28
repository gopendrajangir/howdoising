import { HomeRecording, ActionTypes, RecordingsAction } from 'actions';

export interface RecordingsState {
  loading: boolean,
  data: HomeRecording[],
  error: string | null,
}

const INITIAL_STATE: RecordingsState = {
  loading: false,
  data: [],
  error: null,
};

export default (
  state: RecordingsState = INITIAL_STATE,
  action: RecordingsAction
): RecordingsState => {
  switch (action.type) {
    case ActionTypes.fetchRecordingsLoading:
      return { ...state, loading: true, error: null };
    case ActionTypes.fetchRecordingsSuccess:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.fetchRecordingsFailed:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
