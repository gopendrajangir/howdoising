import React, { Profiler } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import 'assets/css/index.css';

import App from './App';
import { NavigateContext } from 'context';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  // <Profiler id="app" onRender={
  //   (id: string, phase: 'mount' | 'update', actualDuration: number, baseDuration: number, startTime: number, commitTime: number, interactions: Set<{
  //     __count: number;
  //     id: number;
  //     name: string;
  //     timestamp: number;
  //   }>) => {
  //     console.log("id", id);
  //     console.log("phase", phase);
  //     console.log("actual duration", actualDuration);
  //     console.log("base duration", baseDuration);
  //     console.log("start time", startTime);
  //     console.log("commit time", commitTime);
  //     console.log("Interactions", interactions);
  //   }}>
  <Provider store={store}>
    <App />
  </Provider>
  // </Profiler>
)