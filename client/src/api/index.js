import axios from "axios";

// // prev localhost
// const url = 'http://localhost:5000/listings';

// Heroku host, ignore this
// const url = 'https://azon-cz2006.herokuapp.com/listings';
// const API = axios.create({ baseURL: 'https://azon-cz2006.herokuapp.com' });

// the base API URL
export const API = axios.create({ baseURL: "http://localhost:5000" }); // work on localhost

// send token back to backend, so that backend middleware can verify that user is actually log in.
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchListing = () => API.get("/listings");

// take in param (newListing) - the entire Listing
export const createListing = (newListing) => API.post("/listings", newListing);

//Update
export const updateListing = (id, updatedListing) =>
  API.patch(`/listings/${id}`, updatedListing);

//Delete
export const deleteListing = (id) => API.delete(`/listings/${id}`);

// Like
export const likeListing = (id) => API.patch(`/listings/${id}/likeListing`);

// User routes
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const userUpdatePwd = (id, formData) =>
  API.patch(`/user/${id}`, formData);

// Agent routes
export const agentSignIn = (formData) => API.post("/agent/signin", formData);
export const agentSignUp = (formData) => API.post("/agent/signup", formData);
export const agentUpdateProfile = (id, formData) =>
  API.patch(`/agent/${id}/profile`, formData);
export const agentUpdatePwd = (id, formData) =>
  API.patch(`/agent/${id}/psw`, formData);

//fetch agent
export const fetchAgent = () => API.get("/agents");

//fetch user
export const fetchUser = () => API.get("/user");

//delete Agent
export const deleteAgent = (userID) => API.delete(`/agent/${userID}`);

//delete User
export const deleteUser = (userID) => API.delete(`/user/${userID}`);