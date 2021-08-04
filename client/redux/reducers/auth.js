import axios from "axios";
import history from "../../utils/history";

const SET_AUTH = "SET_AUTH";
const RESET_AUTH = "RESET_AUTH";
const SET_PRE_CHECK_FAILED = "SET_PRE_CHECK_FAILED";
const SET_LOGIN = "SET_LOGIN";

const INITIAL_STATE = {
  auth: {},
  loggedIn: false,
  preCheck: false,
};

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const setLogin = (loggedIn) => {
  return {
    type: SET_LOGIN,
    loggedIn,
  };
};
export const setFailed = () => {
  return {
    type: SET_PRE_CHECK_FAILED,
  };
};
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me", { credentials: "include" });
    dispatch(setAuth(res.data));
  } catch (err) {
    dispatch(setFailed());
    console.log(err);
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      await axios.post(`/auth/${method}`, { username, password });
      dispatch(me());
      dispatch(setLogin(true));
      history.push("/home");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const reset = () => {
  return {
    type: RESET_AUTH,
  };
};
export const resetAuth = () => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    dispatch(reset());
    history.push("/login");
  } catch (err) {
    console.log(err);
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, loggedIn: action.loggedIn };
    case SET_AUTH:
      return { ...state, auth: action.auth, loggedIn: true, preCheck: true };
    case RESET_AUTH:
      return { auth: {}, loggedIn: false, preCheck: false };
    case SET_PRE_CHECK_FAILED:
      return { ...state, preCheck: true };
    default:
      return state;
  }
}