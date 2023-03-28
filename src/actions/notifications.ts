import { Dispatch } from 'redux';
import Axios from 'axios';

import { api } from 'utils/apis';

import { loginSuccess, LoginSuccessAction } from './auth/login';
import { StoreState } from 'reducers';

export const fetchUserNotifications = () => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      const { login: { isLoggedIn } }: StoreState = getState();

      if (isLoggedIn) {
        const response = await Axios.get(`${api}/users/notifications/unread`, { withCredentials: true, });

        if (response && response.data && response.data.data) {
          dispatch<LoginSuccessAction>(loginSuccess(response.data.data));
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const readAllNotifications = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await Axios.get(`${api}/users/notifications/readAllNotifications`, { withCredentials: true, });

      if (response && response.data && response.data.data) {
        dispatch<LoginSuccessAction>(loginSuccess(response.data.data));
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};
