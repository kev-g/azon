import { FETCH_ALL_AGENT } from "../constants/actionTypes";

export default (agents = [], action) => {
  switch (action.type) {
    case FETCH_ALL_AGENT:
      return action.payload;
    // case 'USERUPDATE': //   return action.payload
    default:
      return agents;
  }
};
