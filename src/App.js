import React from "react";

import { Route, Switch } from "react-router";

import Nav from "./components/Nav";
import Plan from "./components/Plan";
import Marathon from "./components/Plan/Marathon";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" exact component={Plan} />
        <Route path="/plans/marathon" exact component={Marathon} />
      </Switch>
    </div>
  );
}

export default App;
