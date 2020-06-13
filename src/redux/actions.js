import { push } from "connected-react-router";
import axios from "axios";
import { store } from "../configureStore";

const clientID = "32527";
const clientSecret = "abf2cb8ea5414a2ebf77a07197baf95acdef8164";
const BASE_URL = "https://www.strava.com/api/v3";

function _getAccessToken() {
  return localStorage.getItem("accessToken");
}

// function _getExpiresAt() {
//     return localStorage.getItem("expiresAt");
// }

function _getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

const tokenClient = axios.create({
  baseURL: "https://www.strava.com/oauth",
  timeout: 3000
});

const apiClient = axios.create({ baseURL: BASE_URL });

apiClient.interceptors.request.use(
  config => {
    const token = _getAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      store.dispatch(startLoading());
      tokenClient({
        url: "/token",
        method: "post",
        params: {
          client_id: clientID,
          client_secret: clientSecret,
          refresh_token: _getRefreshToken(),
          grant_type: "refresh_token"
        }
      }).then(res => {
        console.log("RE AUTH:", res);
        if (res.status === 200) {
          apiClient.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.access_token;
          // Dispatch process authentication
          const athlete = { id: store.getState().auth.athlete_id };
          store.dispatch(updateAuthTokens({ ...res.data, athlete }));
          store.dispatch(endLoading());
          return apiClient(originalRequest);
        }
      });
    }
    // return Error object with Promise
    return Promise.reject(error);
  }
);

export const startLoading = () => {
  return {
    type: "START_LOADING"
  };
};

export const endLoading = () => {
  return {
    type: "END_LOADING"
  };
};

export const errorLoading = () => {
  return {
    type: "ERROR_LOADING"
  };
};

export const authorize = () => {
  return {
    type: "REDIRECT_TO_OAUTH"
  };
};

export const recieveAuthenticationError = data => {
  return {
    type: "UPDATE_AUTH_TOKENS_ERROR",
    data: data
  };
};

export const updateAuthTokens = data => {
  return {
    type: "UPDATE_AUTH_TOKENS",
    data: {
      isAuthenticated: true,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      accessToken: data.access_token,
      athlete_id: data.athlete.id
    }
  };
};

export const startAuththentication = code => {
  return function(dispatch, getState) {
    dispatch(startLoading());
    tokenClient({
      url: "/token",
      method: "post",
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code"
      }
    })
      .then(response => {
        // Dispatch process authentication
        dispatch(updateAuthTokens(response.data));
        dispatch(push("/"));
        dispatch(endLoading());
      })
      .catch(error => {
        // Dispatch error message
        // Dispatch finish waiting room
        dispatch(recieveAuthenticationError());
      });
  };
};

export const updateAthleteError = data => {
  return {
    type: "UPDATE_ATHLETE_ERROR",
    data: data
  };
};

export const updateAthlete = data => {
  return {
    type: "UPDATE_ATHLETE",
    data: data
  };
};

export const getAthleteData = () => {
  return function(dispatch, getState) {
    dispatch(startLoading());

    apiClient({
      url: "/athlete",
      method: "get"
    }).then(response => {
      console.log("DATA__:", response);
      // Dispatch process authentication
      dispatch(updateAthlete(response.data));
      dispatch(endLoading());
    });
    // .catch((error) => {
    //     // Dispatch error message
    //     // Dispatch finish waiting room
    //     dispatch(updateAthleteError());
    // });
  };
};

export const updateStatsError = data => {
  return {
    type: "UPDATE_STATS_ERROR",
    data: data
  };
};

export const updateStats = data => {
  return {
    type: "UPDATE_ATHLETE_STATS",
    data: data
  };
};

export const getAthleteStats = () => {
  return function(dispatch, getState) {
    dispatch(startLoading());

    const id = getState().auth.athlete_id;

    apiClient({
      url: `/athletes/${id}/stats`,
      method: "get"
    }).then(response => {
      // Dispatch process authentication
      dispatch(updateStats(response.data));
      dispatch(endLoading());
    });
    // .catch((error) => {
    //     // Dispatch error message
    //     // Dispatch finish waiting room
    //     dispatch(updateStatsError());
    // });
  };
};

export const updatActivitiesError = data => {
  return {
    type: "UPDATE_ATHLETE_ACTIVITIES_ERROR",
    data: data
  };
};

export const updateActivities = data => {
  // console.log("updateActivities!!", data);
  return {
    type: "UPDATE_ATHLETE_ACTIVITIES",
    data: data
  };
};

export const getActivities = (page = 1) => {
  return function(dispatch, getState) {
    dispatch(startLoading());

    const epch = new Date(2019, 0, 1).getTime() / 1000; // Month is 0 based WTF!

    apiClient({
      url: `/athlete/activities?per_page=50&after=${epch}&page=${page}`,
      method: "get"
    }).then(response => {
      const activities = response.data;
      dispatch(updateActivities(activities));
      if (activities.length > 0) {
        dispatch(getActivities(page + 1));
      } else {
        dispatch(endLoading());
      }
    });
    // .catch((error) => {
    //     dispatch(updatActivitiesError(error));
    // });
  };
};
