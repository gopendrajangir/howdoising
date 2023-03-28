import { ActionTypes, MeAction, UserMe } from "actions";

export interface MeState {
  loading: boolean;
  data: UserMe | null;
  error: string | null;
}

const INITIAL_STATE: MeState = {
  loading: false,
  data: null,
  error: null,
};

export default (
  state: MeState = INITIAL_STATE,
  action: MeAction
) => {
  switch (action.type) {
    case ActionTypes.fetchMeLoading:
      return { ...state, data: null, loading: true, error: null };
    case ActionTypes.fetchMeSuccess:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.fetchMeFailed:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};
