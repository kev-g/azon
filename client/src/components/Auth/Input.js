import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


// Generalise the logic
const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    //if half is true, show 6 as size, else show 12size (12 is the fullsize)
  <Grid item xs={12} sm={half ? 6 : 12}>  
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={name === 'password' ? {  // show pwd
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}  // null if dont show anything
    />
  </Grid>
);

export default Input;