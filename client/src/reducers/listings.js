import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (listings = [], action) => {
    // if(action.type == 'CREATE'){
    //     return action
    // }

    switch (action.type) {
        case FETCH_ALL: 
            return action.payload;  //action.payload = actual listing

        case CREATE: 
            // return listings;
            return [...listings, action.payload]; // action stored in payload

        case UPDATE:
            return listings.map((listing) => (listing._id === action.payload._id ? action.payload : listing));
              
              
        case DELETE:
            return listings.filter((listing) => listing._id !== action.payload);
            
        // same as update
        case LIKE:
            return listings.map((listing) => (listing._id === action.payload._id ? action.payload : listing));
            
        default:
            return listings;
    }
}