import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import emailjs from "emailjs-com";
import { agentSignin, agentSignup } from "../../actions/agentAuth";
import useStyles from "./styles";
import Input from "./Input";
import FileBase from "react-file-base64";

// initial states
const initialState = {
  firstName: "",
  lastName: "",
  CEA: "",
  type: "agent",
  phoneNumber: "",
  agent_status: "Pending",
  agency: "",
  email: "",
  password: "",
  confirmPassword: "",
  profile_pic: "",
  overallRating: "0",
  ratingList: [],
  reviewList: [],
  description: "Hi, I'm new here.",
};

const AgentAuth = () => {
  const [form, setForm] = useState(initialState); // set a form state
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(form);

    if (isSignup) {
      dispatch(agentSignup(form, history)); // pass in formdata, pass in hist, navigate once smth happens
      emailjs
        .sendForm(
          "service_hgi1w6g",
          "template_0teptjj",
          e.target,
          "user_Y4ik86BzyllTug3YYhcRR"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(agentSignin(form, history));
    }
  };

  // only change the specified current input with the target value
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Agent Sign up" : "Agent Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && ( // only if signedup, show details. // Grid below is transferred to input.js
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="CEA"
                  label="CEA Number"
                  handleChange={handleChange}
                  type="text"
                />
                <Input
                  name="agency"
                  label="Agency"
                  handleChange={handleChange}
                  type="text"
                />
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  handleChange={handleChange}
                  type="text"
                />
                <div className={classes.fileInput}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setForm({ ...form, profile_pic: base64 })
                    }
                  />
                </div>
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "http://localhost:3002/";
              }}
            >
              Admin Dashboard
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AgentAuth;
