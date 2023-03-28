import { ActionTypes, MessageTypes, SetMessageAction } from 'actions';

export interface MessageState {
  message: string | null,
  type: MessageTypes | null
}

const INITIAL_STATE: MessageState = {
  message: null,
  type: null
};

export default (state: MessageState = INITIAL_STATE, action: SetMessageAction): MessageState => {
  switch (action.type) {
    case ActionTypes.setMessage: {
      return { ...state, message: action.payload.message, type: action.payload.type };
    }
    default: {
      return state;
    }
  }
};
