import jwt from "jsonwebtoken";

const secret = 'test';

// we will use this middleware in the listings routes.

// middleware's purpose: Its like a validator, checks before allowing next action/redirection
// e.g. want to like a listing
// Click on like button => auth middleware(next) => like controller...

// next means do smth then move to the 'next' thing
const auth = async (req, res, next) => {
  try {
      // check if user's token is valid, token is on the 1st position of array
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;  // own token if < 500, else is google token

    let decodedData; // data we want to get from token

    // if its our own token
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);  // gives username and id of user

      req.userId = decodedData?.id;  // store diff user id, thus we will know which user like whose's listings
    } else {
      decodedData = jwt.decode(token);  // the google token, dont need secret

      req.userId = decodedData?.sub;  // sub is google's way of differentiating diff users id
    }    

    next();  // Ok to click the listing if the user has permission/its his own listing
  } catch (error) {
    console.log(error);
  }
};

export default auth;