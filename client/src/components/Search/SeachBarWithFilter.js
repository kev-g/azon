import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Box, Typography, Button} from '@mui/material';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete'

const SeachBarWithFilter = ({setsearchQueryNew, setCloseAlert, setfilterByTown, setfilterByPrice ,setFilterByFlatType, searchQueryNew, uniqueTown, flatType }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [priceRangeSliderValue, setPriceRangeSliderValue] = useState([0, 1200000]);
    const [townName, setTownName] = useState([])
    const [flatTypeName, setFlatTypeName] = useState([])
    const minDistance = 100000

    const marks = [
        {
          value: 0,
          label: '$0',
        },
        {
          value: 200000,
          label: '$200,000',
        },
        {
          value: 400000,
          label: '$400,000',
        },
        {
          value: 600000,
          label: '$600,000',
        },
        {
            value: 800000,
            label: '$800,000',
        },
        {
          value: 1000000,
          label: '$1,000,000',
        },
        {
          value: 1200000,
          label: '$1,200,000',
        }
      ];

 
    const handleSearchQueryChange = (e) => {

            if (e.keyCode === 13) {
                setsearchQueryNew({ [e.target.name]: e.target.value.trim() })
                setCloseAlert(true)
            }
        };
   

    const handleTownNameChange = (e) => {
        const { target: { value },} = e;
        setTownName(
            typeof value === 'string' ? value.split(',') : value,
        );
        setfilterByTown(value)
        console.log(value)
    };

    const handleflatTypeChange = (e) => {
        const { target: { value },} = e;
        setFlatTypeName(
            typeof value === 'string' ? value.split(',') : value,
        );
        setFilterByFlatType(value)
        console.log(value)
        console.log(typeof value)
    };

    const handlePriceRangeSliderChange = (event, newValue, activeThumb) => {

        if (!Array.isArray(newValue) || newValue[0] === newValue[1]) {
            return;
        }

        if (activeThumb === 0)
            setPriceRangeSliderValue([Math.min(newValue[0], priceRangeSliderValue[1] - minDistance), priceRangeSliderValue[1]]);
        else
            setPriceRangeSliderValue([priceRangeSliderValue[0], Math.max(newValue[1], priceRangeSliderValue[0] + minDistance)]);


        setfilterByPrice(newValue)

    };

    const handleAutoCompleteChange = (e,value) => {
        
        setsearchQueryNew({'searchQuery': value})
    };


    return (
        <Grid  container spacing={3}
        direction="row" 
        sx={{mt:0.1, backgroundColor:'white', borderRadius:5}} >
           
            <Grid item xs={3} sx={{ml:1}} >
                <Autocomplete
                     freeSolo
                     options={uniqueTown}
                     renderInput={(params) => <TextField {...params} label = 'Search Property'/>}
                     defaultValue = {searchQueryNew.searchQuery === undefined || searchQueryNew.searchQuery === '' || searchQueryNew.searchQuery === null ? '':searchQueryNew.searchQuery}
                     onChange={handleAutoCompleteChange}
                    /*  color="primary"
                     name='searchQuery'
                     type='text'
                     label = 'Search Property'
                     fullWidth
                     defaultValue = {searchQueryNew.searchQuery === undefined || searchQueryNew.searchQuery === '' ? '':searchQueryNew.searchQuery}
                     variant="outlined"
                     onKeyUp={handleSearchQueryChange} */
                />
            </Grid>

            <Grid item xs = {2} >
                <FormControl fullWidth >
                    <InputLabel id="Filter By Area">Filter By Area</InputLabel>
                    <Select 
                        sx={{ maxWidth: 600 }}
                        onChange={handleTownNameChange}
                        input={<OutlinedInput label="Filter By Area" />}
                        multiple value={townName}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {uniqueTown.map((town) => (
                            <MenuItem key={town} value={town}>
                                <Checkbox checked={townName.indexOf(town) > -1} />
                                <ListItemText primary={town} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs = {2} >
                <FormControl fullWidth >
                    <InputLabel id="Filter By Flat type">Filter By Flat type</InputLabel>
                    <Select
                        sx={{ maxWidth: 600 }}
                        onChange={handleflatTypeChange}
                        input={<OutlinedInput label="Filter By Flat type" />}
                        multiple value={flatTypeName}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {flatType.map((flatType) => (
                            <MenuItem key={flatType} value={flatType}>
                                <Checkbox checked={flatTypeName.indexOf(flatType) > -1} />
                                <ListItemText primary={flatType} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
                
            <Grid sx={{mr:3}} item xs>
                <Box >
                    <Typography gutterBottom>Filter By Price</Typography>
                    <Slider
                        value={priceRangeSliderValue}
                        onChange={handlePriceRangeSliderChange}
                        valueLabelDisplay="auto"
                        step={100000}
                        marks = {marks}
                        min={0}
                        max={1200000}
                        disableSwap
                    />
                </Box>
            </Grid>
            <Grid item xs={1} sx={{pr:5}} >
                <Button variant='outlined' onClick={()=>{
                    setfilterByTown([])
                    setfilterByPrice([0,1200000])
                    setPriceRangeSliderValue([0,1200000])
                    setTownName([])
                    setFlatTypeName([])
                    setFilterByFlatType([])
                }} >
                    Reset filters</Button>
            </Grid>
        </Grid>
    )
}

export default SeachBarWithFilter
