import React from "react";
import { connect } from "react-redux";

import { Route, Switch } from "react-router";

import Nav from "./components/Nav";
import Plan from "./components/Plan";

function App(props) {
  return (
    <div className="bg-light">
      <Nav />
      <div className="p-0 rounded border m-3">
        <Switch>
          <Route path="/" exact component={Plan} />
        </Switch>
      </div>
    </div>
  );
}

export default connect(
  null,
  null
)(App);
