import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import SendIcon from '@mui/icons-material/Send';
import Popover from '@mui/material/Popover'
import listings from "../../images/listings.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";
import Box from '@mui/material/Box'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation(); // when location change, set the user
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

    const handleAnchorClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAnchorClose = () => {
        setAnchorEl(null);
    };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT }); // logout

    history.push("/auth"); // redirect back to auth

    setUser(null);
  };

  const open = Boolean(anchorEl);

  // Auto-refresh
  useEffect(() => {
    const token = user?.token; // check if token exists

    // JSON web token (Manual login)
    if (token) {
      const decodedToken = decode(token); // check when the token expires

      if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // logout once token expired
    }

    // Google acc login
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); // when location change, set the user

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          {" "}
          Azon{" "}
        </Typography>
        <img
          className={classes.image}
          src={listings}
          alt="listings"
          height="60"
        />
        <Box sx={{ml:2}} >
         <Button  variant="contained" onClick={handleAnchorClick}> View Past No. of applications</Button>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleAnchorClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <iframe width="800" height="800" src="https://data.gov.sg/dataset/number-of-applications-registered-for-resale-flats/resource/dea41bef-7116-43ba-9f2f-f13bfbf876d2/view/ae7cd44a-5866-4750-95d3-10e538ac4c84"
                        frameBorder="0.5">
                    </iframe>
                </Popover>
            </Box>
      </div>
      {/* User Logic here */}
      <Toolbar className={classes.toolbar}>
        {user?.result ? ( // if user exists, (login)
          <div className={classes.profile}>
            {user.result.type !== "admin" ? (
            <a href="/profile">
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.profile_pic}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            </a>
            ):(
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            )}
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            
            {user.result.type !== "agent" ? (
              // <Link to="/agentHub">Agent Hub</Link>

              user.result.type === "user" ?(
                <Button component={Link} to="/agentHub"  className={classes.purple} variant="contained"  >
               Agent Hub
                </Button>
              ):(
                <Button component={Link} to="/AgentList"  className={classes.purple} variant="contained"  >
               Admin Dashboard
                </Button>
              )
              
            ) : (
              <>
              {/* <Button component={Link} to="/reset"  className={classes.purple} variant="contained"  >
               Reset Password
             </Button> */}
             

             <Button component={Link} to="/createListing" className={classes.orange}  variant="contained" endIcon={<SendIcon />}>
               My Listings
             </Button>
              
              
              </>
            )}

             
            

            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          // else (not login)
          <div>
            <Button
              component={Link}
              to="/agent"
              variant="contained"
              color="primary"
            >
              Agent Sign In
            </Button>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              User Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
