const appMiddleware = store => next => action => {
  // switch (action.type) {
  //     case "START_LOADING":
  //         console.log("START_LOADING");
  //     case "END_LOADING":
  //         console.log("END_LOADING");
  // }

  next(action);
};

export default appMiddleware;
