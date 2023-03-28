import React from 'react';
import { LoginState } from 'reducers/auth/login';
import io from 'socket.io-client';

import { socketApi } from 'utils/apis';

export const UserContext = React.createContext<LoginState>({} as LoginState);
export const SocketContext = React.createContext(io(socketApi, { transports: ["websocket", "polling"] }));
export const NavigateContext = React.createContext<((to: string) => void)>((to: string) => undefined);