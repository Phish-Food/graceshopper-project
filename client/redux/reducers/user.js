import axios from "axios";

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";
const GET_ALL_USERS = "GET_ALL_USERS";


const defaultUser = {
};

const getUser = user => {
    return {
        type: GET_USER,
        user
    };
}

export const fetchAllUsers = () => {
    return (dispatch, getState) => {
        console.log('this does happen!')
      return axios.get("/api/users")
          .then(response => {
              console.log('response',response.data)
              dispatch({
                  type: GET_ALL_USERS,
                  allusers: response.data
              });
          })
          .catch(error => {
              console.log(error);
          });
  };
  }

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
}

const getAllUsers = allusers => {
    return {
        type: GET_ALL_USERS,
        allusers
    };
}

const updateUser = (user, value) => {
    return {
        type: UPDATE_USER,
        user,
        value
    };
}

export const getSingleUser = (userId) => {
    return async (dispatch) => {
      try { 
        console.log('this thunk is working',userId)
        const { data } = await axios.get(`/api/users/${userId}`);
        console.log('data',data)
        dispatch(getUser(data));

      } catch (error) {
        console.log(error);
      }
    };
  };



const initialState={
    userlist:[],
    user:defaultUser
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_USERS:
        return { ...state, userlist: action.allusers};
      case GET_USER:
          return {...state, user: action.user}  
      default:
        return state;
    }
  }