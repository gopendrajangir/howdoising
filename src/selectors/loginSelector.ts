import { createSelector } from "@reduxjs/toolkit";
import { StoreState } from "reducers";
import { LoginState } from "reducers/auth/login";


export const loginSelector = createSelector(
  [(state: StoreState): LoginState => state.login],
  (login: LoginState): LoginState => login
)