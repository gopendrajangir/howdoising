import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "containers/Navigation";
import Logout from "containers/Logout";

import Home from "components/Home";
import Signup from "components/Signup";
import Login from "components/Login";
import Profile from "components/Profile";
import Sing from "components/Sing";
import Settings from "components/Settings";
import Auditorium from "components/Auditorium";

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
          <Route path="/sing" exact component={Sing} />
          <Route path="/settings/personal" exact component={Settings} />
          <Route path="/settings/security" exact component={Settings} />
          <Route path="/auditorium" exact component={Auditorium} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
