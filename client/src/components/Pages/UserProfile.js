import { Paper, Button } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import Check from "@mui/icons-material/Check";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState("");
  const [reupload, setReupload] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const uploadPic = () => {
    dispatch(updateProfile(user.result._id, userProfile));
    setReupload(!reupload);
  };

  console.log("reupload", reupload);

  useEffect(() => {
    history.push('/userProfile')
    async function fetchData() {
      console.log(user.result._id);
      let response = await axios.get(
        `http://localhost:5000/user/${user.result._id}`
      );
      setUserProfile(response.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {user.result.type === "user" ? (

        <section
          style={{
            textAlign: "center",
            paddingLeft: "30%",
            paddingRight: "30%",
          }}
        >


          <div className={classes.overlay}>
            <Paper>
              <label>Name:</label>
              <h1>{userProfile.name}</h1>
            </Paper>
            <Paper>
              <label>Email:</label>
              <h4>{userProfile.email}</h4>
            </Paper>
            
            <Button
              component={Link}
              to={{
                pathname: `/userProfile/${userProfile._id}`,
              }}
              className={classes.purple}
              variant="contained"
            >
              Edit Profile
            </Button>
            <Button
              component={Link}
              to="/reset"
              className={classes.purple}
              variant="contained"
            >
              Reset Password
            </Button>
          </div>
        </section>
      ) : (
        <Button
          component={Link}
          to="/reset"
          className={classes.purple}
          variant="contained"
        >
          Reset Password
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
