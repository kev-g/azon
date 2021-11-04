// Put logic here
import bcrypt from "bcryptjs"; // it hashes the password
import jwt from "jsonwebtoken"; // store pwd in browser for a period of time
import UserModel from "../models/user.js"; // import user model
import mongoose from "mongoose";
const secret = "test"; // a secret string

// Login/sign in func
export const signin = async (req, res) => {
  const { email, password } = req.body; // get email and pwd from frontend

  try {
    // Retrieve the existing user
    const existingUser = await UserModel.findOne({ email });

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
export const signup = async (req, res) => {
  const { email, type, password, confirmPassword, firstName, lastName } =
    req.body;

  try {
    // Retrieve the existing user
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Check if pwd matches
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match!" });

    // hash the pwd, 12 is the lvl of difficulty (generally use 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Pass in the data, combine first and lastname
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      type,
    });

    // create token
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token }); // the user is the result
  } catch (error) {
    // res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const userUpdatePwd = async (req, res) => {
  //extract the id, /listings/123

  const { id } = req.params;

  // edit attributes here
  const { name, email, password, type } = req.body;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  const updatedPassword = await bcrypt.hash(password, 12);

  const updatedProfile = {
    name,
    email,
    type,
    password: updatedPassword,
    _id: id,
  };

  await UserModel.findByIdAndUpdate(id, updatedProfile, { new: true });

  res.json(updatedProfile); // save updatedListing
};
