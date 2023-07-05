import React from 'react';
import Dialog from '@mui/material/Dialog';
import useStyles from '../pages/SignUpForm/SignUpForm.styles';
import { Link, Button, DialogTitle, DialogContent } from '@mui/material';

const GlobalModel = (props: any) => {

  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {props.isButton ? <Button className={classes.btnGlobalModel} onClick={handleClickOpen}>{props.btnOpen}  </Button> :
        <Link className={classes.openSignUp} onClick={handleClickOpen} underline="hover" >
          {props.btnOpen}
        </Link>}
      <Dialog fullWidth maxWidth={'md'} className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent className={classes.dialogContent} sx={{ p: 0, height: '42rem' }}>
          <div className={classes.detailsDiv} style={{ display: 'inline-block', paddingBottom: "1rem" }}>
            <DialogTitle sx={{ fontSize: 35, pl: "3rem" }}>{props.title}</DialogTitle>
            <DialogContent style={{ paddingLeft: "3rem" }}>
              {props.children}
            </DialogContent>
          </div>
          <div className={classes.sideBackImg} style={{ display: 'inline-block' }}>
            <img className={classes.giftImg} src={props.img} alt={props.img} />
            <div className={classes.txtSide} style={{ paddingLeft: "25px", paddingRight: "25px", marginTop: 0 }}>
              {props.txtSide}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalModel;
