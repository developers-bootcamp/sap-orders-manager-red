import React from 'react';
import Dialog from '@mui/material/Dialog';
import useStyles from '../styles/signUp.styles';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import {  FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput,Button ,FormHelperText, DialogTitle, DialogContent} from '@mui/material';

import giftsImg from "../img/gifts.png"
import SingUpForm from './SignUpForm';

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

      {props.isButton?<Button className={classes.btnGlobalModel} onClick={handleClickOpen}>{props.btnOpen}  </Button>:<Link className={classes.openSignUp} onClick={handleClickOpen} underline="hover" >
       {props.btnOpen}
      </Link>}

      <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent className={classes.dialogContent} >
          <div >
            <div className={classes.detailsDiv} style={{ display: 'inline-block' }}>

              <DialogTitle> {props.title}</DialogTitle>
              {props.children}

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

export default GlobalModel;
