import { combineReducers } from 'redux';

import loginReducer, { LoginState } from './auth/login';
import signupReducer, { SignupState } from './auth/signup';
import setPasswordReducer, { SetPasswordState } from './auth/setPassword';
import resetPasswordReducer, { ResetPasswordState } from './auth/resetPassword';
import recordingsReducer, { RecordingsState } from './recordings';
import messageReducer, { MessageState } from './message';
import searchReducer, { SearchState } from './search';
import recordingReducer, { RecordingState } from './recording';
import meReducer, { MeState } from './me';

export interface StoreState {
  login: LoginState,
  signup: SignupState,
  setPassword: SetPasswordState,
  resetPassword: ResetPasswordState,
  recordings: RecordingsState,
  message: MessageState,
  search: SearchState,
  recording: RecordingState,
  me: MeState
}

export default combineReducers<StoreState>({
  login: loginReducer,
  signup: signupReducer,
  setPassword: setPasswordReducer,
  resetPassword: resetPasswordReducer,
  recordings: recordingsReducer,
  message: messageReducer,
  search: searchReducer,
  recording: recordingReducer,
  me: meReducer,
});
