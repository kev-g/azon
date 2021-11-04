import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';  // able to use all

// Action creators, (dealing with async, we add another dispatch func using redux thunk)
export const getListing =  () => async(dispatch) => {
    try{
        const { data } = await api.fetchListing(); // get from backend
        dispatch({ type: FETCH_ALL, payload: data })
    }catch(error){
        console.log(error.message);

    }

}

export const createListing = (post) => async (dispatch) => {
    try{
        const { data } = await api.createListing(post); // sending a list req

        dispatch( {type: CREATE, payload: data })

    }catch(error){
        console.log(error.message);

    }
}

export const updateListing = (id, list) => async (dispatch) => {
    try {
      const { data } = await api.updateListing(id, list); //data of updatedlisting
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const likeListing = (id) => async (dispatch) => {
    try {
      const { data } = await api.likeListing(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const deleteListing = (id) => async (dispatch) => {
    try {
      await api.deleteListing(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

