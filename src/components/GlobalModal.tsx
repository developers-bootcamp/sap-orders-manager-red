import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';


import useStyles from '../styles/signUp.styles';

import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import {  DialogTitle, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { FormHelperText } from '@mui/material';


const GlobalModel = (props:any) => {


  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Link className={classes.openSignUp} onClick={handleClickOpen} underline="hover" >
        Sign Up
      </Link>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent className={classes.dialogContent} >
         
            <div className={classes.detailsDiv} style={{ display: 'inline-block' }}>

              <DialogTitle> {props.title}</DialogTitle>
              {props.children}

            </div>
            <div className={classes.sideBackImg} style={{ display: 'inline-block' }}>
           
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GlobalModel;
