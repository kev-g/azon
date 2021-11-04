import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.FETCH_ALL_AGENT:
      return action.payload;

    // case actionType.USERUPDATE:
    //   localStorage.setItem("profile", JSON.stringify({ ...action?.dara }));
    //   return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.AUTH:
      // save in localstorage
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear(); //clear localstorage after logout

      return { ...state, authData: null, loading: false, errors: null }; //authdata will be null

    default:
      return state;
  }
};

export default authReducer;
