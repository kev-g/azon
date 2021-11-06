import { Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/agentAuth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import Check from "@mui/icons-material/Check";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [agentProfile, setAgentProfile] = useState("");
  const [reupload, setReupload] = useState(false);
  const dispatch = useDispatch();
  const uploadPic = () => {
    dispatch(updateProfile(user.result._id, agentProfile));
    setReupload(!reupload);
  };

  console.log("reupload", reupload);

  useEffect(() => {
    async function fetchData() {
      console.log(user.result._id);
      let response = await axios.get(
        `http://localhost:5000/agent/${user.result._id}`
      );
      setAgentProfile(response.data);
      console.log(agentProfile);
    }
    fetchData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      {user.result.type === "agent" ? (

        <section
          style={{
            textAlign: "center",
            paddingLeft: "30%",
            paddingRight: "30%",
          }}
        >
          <img
            style={{ width: 300 }}
            src={
              agentProfile.profile_pic ||
              "https://www.back-tobasics.org/wp-content/uploads/2017/05/default-profile-pic.png"
            }
          ></img>
          {reupload ? (
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setAgentProfile({ ...agentProfile, profile_pic: base64 })
                }
              />
              <Button onClick={uploadPic}>
                <Check></Check>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  setReupload(!reupload);
                }}
              >
                Upload Photo
                <FileUploadIcon></FileUploadIcon>
              </Button>
            </div>
          )}

          <div className={classes.overlay}>
            <Paper>
              <label>Name:</label>
              <h1>{agentProfile.name}</h1>
            </Paper>
            <Paper>
              <label>CEA number:</label>
              <h4>{agentProfile.CEA}</h4>
            </Paper>
            <Paper>
              <label>Agency:</label>
              <h4>{agentProfile.agency}</h4>
            </Paper>
            <Paper>
              <label>Ranking:</label>
              <h4>{agentProfile.overallRating}</h4>
            </Paper>
            <Paper>
              <label>Description:</label>
              <h4>{agentProfile.description}</h4>
              {/* <Link to="/profile/description">Add description</Link> */}
            </Paper>
            <Button
              component={Link}
              to={{
                pathname: `/profile/${agentProfile._id}`,
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

export default Profile;
