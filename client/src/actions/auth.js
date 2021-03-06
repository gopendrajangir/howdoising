import { LOG_IN, LOG_OUT } from "actions/types";

export const logIn = user => {
  return dispatch => {
    dispatch({
      type: LOG_IN,
      payload: user
    });
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: LOG_OUT
    });
  };
};
