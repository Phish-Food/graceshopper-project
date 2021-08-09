import axios from "axios";

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";
const GET_ALL_USERS = "GET_ALL_USERS";


const defaultUser = {};

const getUser = user => {
    return {
        type: GET_USER,
        user
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

export const me = () => async dispatch => {
    try {
        const response = await axios.get("/auth/me");
        dispatch(getUser(response.data || defaultUser));
    } catch (error) {
        console.log(error);
    }
}
