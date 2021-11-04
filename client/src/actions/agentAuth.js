import { AUTH, FETCH_ALL_AGENT, USERUPDATE } from "../constants/actionTypes";
import * as api from "../api/index.js";

// async action creators have to use redux thunk, (a function returns an async func with dispatch)
export const agentSignin = (formData, router) => async (dispatch) => {
  try {
    // log in the user

    const { data } = await api.agentSignIn(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    router.push("/profile"); // redirect home
  } catch (error) {
    alert("wrong email/password");
  }
};

export const agentSignup = (formData, router) => async (dispatch) => {
  try {
    // sign up the user

    const { data } = await api.agentSignUp(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    router.push("/profile"); // redirect home
  } catch (error) {
    alert("Email or CEA already exist");
  }
};

export const updateProfile = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.agentUpdateProfile(userId, profile);
    dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateAgentPwd = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.agentUpdatePwd(userId, profile);
    dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// User update
// export const updatePwd = (userId, profile) => async (dispatch) => {
//   try {
//     const { data } = await api.userUpdatePwd(userId, profile);
//     //dispatch({ type: USERUPDATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAgent = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAgent();
    dispatch({ type: FETCH_ALL_AGENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
