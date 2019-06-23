import { LOG_IN, LOG_OUT } from "actions/types";

const INITIAL_STATE = {
  isloggedIn: null,
  user: null,
  uid: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        uid: action.payload._id,
        error: null
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        uid: null,
        error: null
      };
    default:
      return state;
  }
};
