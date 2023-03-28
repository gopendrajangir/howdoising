import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import 'assets/css/index.css';

import rootReducer, { StoreState } from 'reducers';
import { LoginState } from 'reducers/auth/login';

interface LocalStorageType {
  login: LoginState
}

const loadFromLocalStorage = (): LocalStorageType | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;

    let { login }: LocalStorageType = JSON.parse(serializedState);

    return {
      login: {
        ...login,
        isLoggingIn: false,
        isLoggingOut: false,
        loginError: null,
        logoutError: null,
      }
    }
  } catch (err: any) {
    return undefined;
  }
}

const savedState = loadFromLocalStorage()

const store = configureStore({
  reducer: rootReducer,
  preloadedState: savedState,
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(thunk)
});

const saveToLocalStorage = (state: LocalStorageType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err);
  }
}

store.subscribe(() => {
  const { login }: StoreState = store.getState();
  saveToLocalStorage({ login });
})

export type AppDispatch = typeof store.dispatch;

export default store