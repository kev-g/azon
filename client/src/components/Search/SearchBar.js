import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField';

const SearchBar = ({uniqueTown,refreshListing,setRefreshListing}) => {

    const [searchQuery, updatesearchQuery] = useState(['']);

    const handleChange = (e,value) => {
        
        updatesearchQuery({'searchQuery': value})//updatesearchQuery({...searchQuery,'searchQuery': value})//updatesearchQuery({...searchQuery,[e.target.name]: e.target.value.trim()})//
        console.log(searchQuery)
    };

    const handleChange2 = (e) => {
        updatesearchQuery({'searchQuery': e.target.value.trim()})
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        console.log(searchQuery);
    };


    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                direction: 'column',
                minHeight: '100vh',
            }}>

                <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 , height:70}}  >
                    <Autocomplete 
                    sx = {{pl:1,width:250}}
                    freeSolo
                    options={uniqueTown}
                    renderInput={(params) => <TextField {...params} label="Search for property" />}
                    onChange={handleChange}
                    onKeyUp={handleChange2}
                    />
                    <Box sx={{display:'flex',ml:1}}>
                    <Link to={{pathname:"/displayListings",  state:{searchQuery} }} onClick={()=>{setRefreshListing(!refreshListing)}}>
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon color='secondary'/>
                        </IconButton>
                    </Link>
                    </Box>
                </Paper>
        </Box>
    )
}

export default SearchBar