import { combineReducers } from "redux";
import agents from "./agents";
import listings from "./listings";
import auth from "./auth";

export default combineReducers({ listings, auth, agents });
