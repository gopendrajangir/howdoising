import { Dispatch } from 'redux';
import { ActionTypes, Message, MessageTypes } from './types';

export interface SetMessageAction {
  type: ActionTypes.setMessage,
  payload: Message
}

export const setMessageSuccess = (message: string, type: MessageTypes): SetMessageAction => {
  return {
    type: ActionTypes.setMessage,
    payload: { message, type },
  }
}

export const setMessage = (message: string, type: MessageTypes) => {
  return (dispatch: Dispatch) => {
    dispatch<SetMessageAction>(setMessageSuccess(message, type));
  };
};
