import React from "react";

import { Route, Switch } from "react-router";

import Nav from "./components/Nav";
import Custom from "./views/Custom";
import Marathon from "./views/Marathon";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" exact component={Custom} />
        <Route path="/plans/marathon" exact component={Marathon} />
      </Switch>
    </div>
  );
}

export default App;
