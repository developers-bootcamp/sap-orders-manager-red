import React from 'react';
import Dialog from '@mui/material/Dialog';
// import useStyles from '../pages/signUpForm/SignUpForm.styles';
import { Link, Button, DialogTitle, DialogContent } from '@mui/material';
import { MyDetailsDiv, MyGiftImg, MyOpenDialog, MySideBackImg, MyTxtSide } from './GlobalModal.style';
import { PALLETE } from '../config/config';


const GlobalModel = (props: any) => {

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {props.isButton ? <Button onClick={handleClickOpen} sx={{
        px: 2,
        m:0,
        backgroundColor: `${PALLETE.ORANGE} !important`,
        color: `${PALLETE.WHITE}`,
      }}>{props.btnOpen}</Button> :
        <Link onClick={handleClickOpen} underline="hover" >
          <MyOpenDialog>{props.btnOpen}</MyOpenDialog>
        </Link>}
      {/* <MyDialog> */}
        <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent sx={{ p: 0, height: '42rem' }}>
            <MyDetailsDiv>
              <DialogTitle sx={{ fontSize: 35, pl: "3rem" }}>{props.title}</DialogTitle>
              <DialogContent style={{ paddingLeft: "3rem" }}>
                {props.children}
              </DialogContent>
            </MyDetailsDiv>
            <MySideBackImg>
              <MyGiftImg src={props.img} alt={props.img}></MyGiftImg>
              <MyTxtSide>
                {props.txtSide}
              </MyTxtSide>
            </MySideBackImg>
          </DialogContent>
        </Dialog>
      {/* </MyDialog> */}
    </>
  );
};

export default GlobalModel;
