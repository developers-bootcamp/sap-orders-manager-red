import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import {  DialogTitle, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { FormHelperText } from '@mui/material';
import useStyles from './signUp.styles'
import giftsImg from "../img/gifts.png"
import SingUpForm from './SignUpForm';
import useStyles from './signUp.styles';
import giftsImg from '../img/gifts.png';


  return (
    <div>
      <Link className={classes.openSignUp} onClick={handleClickOpen} underline="hover" >
        Sign Up
      </Link>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent className={classes.dialogContent} >
          <div >
            <div className={classes.detailsDiv} style={{ display: 'inline-block' }}>
              <DialogTitle>Set up your account</DialogTitle>
              <SingUpForm></SingUpForm>
            </div>
            <div className={classes.sideBackImg} style={{ display: 'inline-block' }}>
              <img className={classes.giftImg} src={giftsImg} alt='giftImg' />
              <div className={classes.txtSide}>
                Fill in your details so you can login later</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpComp;