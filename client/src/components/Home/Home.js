import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getListing } from '../../actions/listings';

import Listings from '../Listings/Listings';
import Form from '../Form/Form';
import useStyles from './styles';

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();  // Where to dispatch the action? Inside useffect
    //const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getListing());
    }, [currentId, dispatch]);  // auto change(refresh each listing) by currentId

    return (
    // {(user?.result?.googleId === listing?.creator || user?.result?._id === listing?.creator) && (    
        <Grow in>
                <Container>
                
                <Grid container justifyContent="space-between" alignItems="stretch" spacing= {3}className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Listings setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} variant="contained" />
                    </Grid>
                </Grid>
                
                </Container>
        </Grow>
    // })

    )
}

export default Home