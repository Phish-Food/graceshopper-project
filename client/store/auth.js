import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me", {credentials:'include'});
    return dispatch(setAuth(res.data));
  } catch (err) {
    console.log(err)
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
       await axios.post(`/auth/${method}`, { username, password });

      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

const logout = () => {
  return {
    type: SET_AUTH,
    auth: {},
  }
}


export const resetAuth = () => async(dispatch) => {
  try{
  await axios.delete('/auth/logout')
  history.push("/login");
  dispatch(logout())
  }
  catch(err){
    console.log(err)
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
