import React from "react";
import moment from "moment";

import { ConnectedRouter } from "connected-react-router";
import "react-dates/initialize";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import BootstrapProvider from "@bootstrap-styled/provider/lib/BootstrapProvider";
import { createGlobalStyle } from "styled-components";

import ReactDOM from "react-dom";
import App from "./App";
import { store, history } from "./configureStore";
import "./i18n";
import { theme } from "./theme";

moment.updateLocale("en", {
  week: {
    dow: 1 // Sets monday to be the first day of the week. The way things should be!
  }
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
  }
  * {
    box-sizing: border-box;
  }
  *:before, *:after {
    box-sizing: inherit;
  }
`;
const render = () => {
  ReactDOM.render(
    <BootstrapProvider theme={theme}>
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <GlobalStyle />
            <App history={history} />
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    </BootstrapProvider>,
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
