import { Paper, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { updateProfile } from "../../actions/agentAuth";

const Description = () => {
  let user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const userId = user.result._id;
  const [des, setDes] = useState("Enter your description");
  const handleChange = (e) => setDes(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    user.result.description = des;
    dispatch(updateProfile(userId, user.result));
    alert('Description updated!')
    
  };

  return (
    <div>
      <Paper>
        <form onSubmit={handleSubmit}>
          <label>Edit description</label>
          <TextField
            name="desctiption"
            variant="outlined"
            fullWidth
            value={des}
            onChange={handleChange}
          />
          <button>update</button>
        </form>
      </Paper>
    </div>
  );
};

export default Description;
