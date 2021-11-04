import React from "react";
import Listing from "./Listing/Listing";
import useStyles from "./styles";

import { Grid, CircularProgress, Typography, Paper } from "@material-ui/core";
// fetch from global redux store
import { useSelector } from "react-redux";

const Listings = ({ listing, setCurrentId }) => {
  const listings = useSelector((state) => state.listings);

  const classes = useStyles(); // use css style
  const user = JSON.parse(localStorage.getItem('profile'));

  // if (user?.result?.googleId !== listing?.creator || user?.result?._id !== listing?.creator || user?.result?._id === (listings.length === 0) || user?.result?.googleId === (listings.length === 0) ) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //       You have not created any listings.
  //       </Typography>
  //     </Paper>
  //   );
  // }

  // if(listings.length){
  //   return (
  //         <Paper className={classes.paper}>
  //           <Typography variant="h6" align="center">
  //           You have not created any listings.
  //           </Typography>
  //         </Paper>
  //       );
  // }


  return (
    // Loading spinner, show the listings if its not 0
    !listings.length ? (
    // <>   <CircularProgress /> 
      <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
       You have not created any listings. 
      </Typography>
    </Paper> 
    
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {listings.map((listing) => (
          <Grid key={listing._id} item xs={12} sm={6}>
            {/* Props drilling, keep sending over to the child */}
            {(user?.result?.googleId === listing?.creator || user?.result?._id === listing?.creator) && (
            <Listing listing={listing} setCurrentId={setCurrentId} />
            )}
          </Grid>
        ))}
      </Grid>
    )
  );
};


export default Listings;
