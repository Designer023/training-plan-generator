// import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.scss";

import { ConnectedRouter } from "connected-react-router";
import "react-dates/initialize";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store, history } from "./configureStore";

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App history={history} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept("./App", () => {
    render();
  });
}
