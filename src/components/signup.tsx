import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox, DialogTitle, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import useStyles from './signUp.styles';
import SingUpForm from './SignUpForm';


const SignUpComp = (props:any) => {
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
       {props.btnOpen}
      </Link>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent  className={classes.dialogContent} >
          <div >
            <div className={classes.detailsDiv} style={{ display: 'inline-block' }}>
              <DialogTitle> {props.title}</DialogTitle>
             <SingUpForm></SingUpForm>
            </div>
            <div className={classes.sideBackImg} style={{ display: 'inline-block' }}>
              <img className={classes.giftImg} src={props.img} alt='giftImg'/>
              <div className={classes.txtSide}>
               {props.txtSide}</div>               
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpComp;