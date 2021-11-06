import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// import { useSelector } from 'react-redux';
import useStyles from './styles';

import { likeListing, deleteListing } from '../../../actions/listings';


const Listing = ({ listing, setCurrentId }) => {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  // Likes logic here
  const Likes = () => {
    //adding listing.likes presumes that it is not undefined*, listing.likes.length > 0 alone gives undefined error
    if (listing.likes && listing.likes.length > 0) {
      // check if current person likes/dislikes smth by id
      return listing.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{listing.likes.length > 2 ? `You and ${listing.likes.length - 1} others` : `${listing.likes.length} like${listing.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{listing.likes.length} {listing.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

    //console.log(listings);
 
    return (
        <Card className={classes.card}>
        <CardMedia className={classes.media} image={listing.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={listing.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{listing.name}</Typography>
          <Typography variant="body2">{moment(listing.createdAt).fromNow()}</Typography>
        </div>
         {/* check userid(manual/google) is = to the creator, if yes, then show delete button */}
        {(user?.result?.googleId === listing?.creator || user?.result?._id === listing?.creator) && (
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(listing._id)} style={{ color: 'white' }} size="small">
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          {/* <Typography variant="body2" color="textSecondary" component="h2">{listing.tags.map((tag) => `#${tag} `)}</Typography> */}
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{listing.title}</Typography>
        <CardContent>

          <Typography variant="body2" color="textSecondary" component="p">Price: ${listing.resale_price}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Town: {listing.town}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Flat Type: {listing.flat_type}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Flat Model: {listing.flat_model}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Street Name: {listing.street_name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Description: {listing.desc}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Remaining Lease: {listing.remaining_lease} years</Typography>
          
          {/* <Typography variant="body2" color="textSecondary" component="p">Lease StartDate: {listing.leaseStartDate}</Typography> */}

        </CardContent>
        <CardActions className={classes.cardActions}>
          {/* <Button size="small" color="primary" onClick={() => dispatch(likeListing(listing._id))}><ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp; {listing.likeCount}  </Button>
          <Button size="small" color="primary" onClick={() => dispatch(deleteListing(listing._id))}><DeleteIcon fontSize="small" /> Delete</Button> */}

          {/* if not the login user, disable the buttons for likes/delete will not show */}
        {/* <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeListing(listing._id))}>
          <Likes />
        </Button> */}

        {/* check userid(manual/google) is = to the creator, if yes, then show delete button */}
        {(user?.result?.googleId === listing?.creator || user?.result?._id === listing?.creator) && (
        
        <>
        <Button size="small" color="secondary" onClick = {handleClickOpen}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete ?"}
        </DialogTitle>
        <DialogActions>
            <Button onClick={() => dispatch(deleteListing(listing._id))} autoFocus >
                Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
       </Dialog>
       </>
        )}

        </CardActions>
      </Card>
    )
}

export default Listing
