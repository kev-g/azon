import { AUTH, USERUPDATE,FETCH_ALL_USER, DELETE} from "../constants/actionTypes";
import * as api from "../api/index.js";

// async action creators have to use redux thunk, (a function returns an async func with dispatch)
export const signin = (formData, router) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    router.push("/"); // redirect home
  } catch (error) {
    alert("wrong email/password");
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    router.push("/"); // redirect home
  } catch (error) {
    alert("Email already exist");
  }
};

export const updatePwd = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.userUpdatePwd(userId, profile);
    //dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();
    dispatch({ type: FETCH_ALL_USER, payload: data });
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = (userID) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(userID);
    console.log(data);
    dispatch({ type: DELETE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
