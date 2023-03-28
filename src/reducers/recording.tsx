import { ActionTypes, Recording, RecordingAction } from 'actions';

export interface RecordingState {
  loading: boolean;
  data: Recording | null;
  error: string | null
}

const INITIAL_STATE: RecordingState = {
  loading: false,
  data: null,
  error: null,
};

export default (
  state = INITIAL_STATE,
  action: RecordingAction
): RecordingState => {
  switch (action.type) {
    case ActionTypes.fetchRecordingLoading:
      return { ...state, loading: true, error: null };
    case ActionTypes.fetchRecordingSuccess:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.fetchRecordingFailed:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
