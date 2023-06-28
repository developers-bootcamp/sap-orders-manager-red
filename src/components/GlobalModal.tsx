import React from 'react';
import Dialog from '@mui/material/Dialog';
import {  DialogContent, DialogTitle, Link } from '@mui/material';
import useStyles from './signUp.styles';

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
       {props.btnOpen}
      </Link>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent  className={classes.dialogContent} >
          <div >
            <div className={classes.detailsDiv} style={{ display: 'inline-block' }}>
              <DialogTitle> {props.title}</DialogTitle>
              {props.children}
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

export default GlobalModel;
