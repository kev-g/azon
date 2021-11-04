// Put logic here
import bcrypt from "bcryptjs"; // it hashes the password
import jwt from "jsonwebtoken"; // store pwd in browser for a period of time
import mongoose from "mongoose";
import AgentModel from "../models/agent.js"; // import user model

const secret = "test"; // a secret string

// Login/sign in func
export const agentSignin = async (req, res) => {
  const { email, password } = req.body; // get email and pwd from frontend

  try {
    // Retrieve the existing user
    const existingUser = await AgentModel.findOne({ email });

    // if no existinguser, return dont exist
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // Check if pwd used is correct for the existing user
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // wrong pwd, return wrongpwd
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Get the token and store, add a secret string, token expires in 1hr
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign up func
export const agentSignup = async (req, res) => {
  const {
    email,
    CEA,
    agency,
    phoneNumber,
    agent_status,
    password,
    confirmPassword,
    firstName,
    type,
    lastName,
    profile_pic,
    overallRating,
    ratingList,
    reviewList,
    description,
  } = req.body;

  try {
    // Retrieve the existing user
    const existingUser = await AgentModel.findOne({ email });
    const existingCEA = await AgentModel.findOne({ CEA });

    if (existingUser || existingCEA)
      return res.status(400).json({ message: "Email/CEA already exists" });

    // Check if pwd matches
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match!" });

    // hash the pwd, 12 is the lvl of difficulty (generally use 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Pass in the data, combine first and lastname
    const result = await AgentModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      CEA,
      type,
      phoneNumber,
      agent_status,
      agency,
      profile_pic,
      overallRating,
      ratingList,
      reviewList,
      description,
    });

    // create token
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token }); // the user is the result
  } catch (error) {
    //res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
//update profile
export const agentUpdateProfile = async (req, res) => {
  //extract the id, /listings/123

  const { id } = req.params;

  // edit attributes here
  const {
    profile_pic,
    name,
    CEA,
    type,
    phoneNumber,
    agent_status,
    agency,
    email,
    password,
    overallRating,
    ratingList,
    reviewList,
    description,
  } = req.body;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No agent with id: ${id}`);

  const updatedProfile = {
    profile_pic,
    name,
    CEA,
    type,
    phoneNumber,
    agent_status,
    agency,
    email,
    password,
    overallRating,
    ratingList,
    reviewList,
    description,
    _id: id,
  };

  await AgentModel.findByIdAndUpdate(id, updatedProfile, { new: true });

  res.json(updatedProfile); // save updatedListing
};

export const agentUpdatePwd = async (req, res) => {
  //extract the id, /listings/123

  const { id } = req.params;

  // edit attributes here
  const { password } = req.body;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No agent with id: ${id}`);
  const updatedPassword = await bcrypt.hash(password, 12);

  const updatedProfile = {
    password: updatedPassword,
  };

  await AgentModel.findByIdAndUpdate(id, updatedProfile, { new: true });

  res.json(updatedProfile); // save updatedListing
};

export const getAgent = async (req, res) => {
  // add async

  try {
    const agents = await AgentModel.find(); // takes time, so add "await"

    res.status(200).json(agents); // return array of objs
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
