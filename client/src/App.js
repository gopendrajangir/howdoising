import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from 'containers/Navigation';

import Home from 'components/Home';
import Signup from 'components/Signup';
import Login from 'components/Login';
import Profile from 'components/Profile';
import Record from 'components/Record';
import Settings from 'components/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/record" exact component={Record} />
          <Route path="/settings" exact component={Settings} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
