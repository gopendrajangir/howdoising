import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import Axios from "axios";

import { api } from "utils/apis";

import { loginSuccess, LoginSuccessAction } from '../auth/login';
import { setMessageSuccess, SetMessageAction } from '../message';
import { LoggedInUser, MessageTypes } from "../types";

import { StoreState } from "reducers";
import { FieldValues } from "react-hook-form";

export const updatePhoto = (data: FormData) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const { login: { user } }: StoreState = getState();
    try {
      const response = await Axios.patch(`${api}/users/updateMe`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (user && response && response.data && response.data.data) {
        const newUser = response.data.data;

        const tempUser: LoggedInUser = { ...user };
        tempUser.photo = newUser.photo;

        dispatch<LoginSuccessAction>(loginSuccess(tempUser));
        dispatch<SetMessageAction>(setMessageSuccess("Photo updated successfully", MessageTypes.success));
      }

    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  }
}

export const updateName = (data: FieldValues) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const { login: { user } }: StoreState = getState();
    try {
      const response = await Axios.patch(`${api}/users/updateMe`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (user && response && response.data && response.data.data) {
        const newUser = response.data.data;

        const tempUser: LoggedInUser = { ...user };
        tempUser.name = newUser.name;

        dispatch<LoginSuccessAction>(loginSuccess(tempUser));
        dispatch<SetMessageAction>(setMessageSuccess("Name updated successfully", MessageTypes.success));
      }

    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  }
}

export const changePassword = (data: FieldValues, logoutUser: () => void) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    try {
      await Axios.patch(`${api}/users/updateMyPassword`, data, {
        withCredentials: true,
      });

      dispatch<SetMessageAction>(setMessageSuccess("Password changed successfully", MessageTypes.success));
      logoutUser();

    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.message) {
        dispatch<SetMessageAction>(setMessageSuccess(err.response.data.message, MessageTypes.danger));
      } else {
        dispatch<SetMessageAction>(setMessageSuccess(err.message, MessageTypes.danger));
      }
    }
  }
}