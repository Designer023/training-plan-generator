import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import createRootReducer from "./redux/reducers";
import { loadState, saveState } from "./localStorage";
import authMiddleware from "./redux/middleware/auth";
import appMiddleware from "./redux/middleware/app";

import throttle from "lodash/throttle";

export const history = createBrowserHistory();

const persistedState = loadState();

function configureStore(preloadedState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    persistedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        appMiddleware,
        authMiddleware
      )
    )
  );

  store.subscribe(
    throttle(() => {
      saveState({
        auth: store.getState().auth,
        athlete: store.getState().athlete,
        ui: store.getState().ui
      });
    }, 1000)
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./redux/reducers", () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}

export const store = configureStore();
