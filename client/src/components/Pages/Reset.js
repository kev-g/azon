import { Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAgentPwd } from "../../actions/agentAuth";
import { updatePwd } from "../../actions/auth";
import useStyles from "./styles";

const Reset = () => {
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem("profile"));
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const dispatch = useDispatch();
  const userId = user.result._id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd === "") {
      alert("passwords cannot be empty");
    } else if (pwd !== confirmPwd) {
      alert("passwords are not same");
    } else {
      user.result.password = pwd;
      console.log(user.result);
      if (user.result.type === "agent") {
        dispatch(updateAgentPwd(userId, user.result));
      } else {
        dispatch(updatePwd(userId, user.result));
      }
      alert("password updated");
    }
  };

  return (
    <div>
      <Paper>
        <label>password reset </label>
        <form onSubmit={handleSubmit}>
          <TextField
            name="password"
            variant="outlined"
            fullWidth
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <TextField
            name="confirmPassword"
            variant="outlined"
            fullWidth
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          <button className={classes.purple} variant="contained">
            Reset
          </button>
        </form>
      </Paper>
    </div>
  );
};

export default Reset;
