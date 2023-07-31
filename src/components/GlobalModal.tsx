import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Link, Button, DialogTitle, DialogContent } from '@mui/material';
import { MyDetailsDiv, MyGiftImg, MyOpenDialog, MySideBackImg, MyTxtSide } from './GlobalModal.style';
import { PALLETE } from '../config/config';

const GlobalModel = (props: any) => {

  const [open, setOpen] = React.useState(false)
  const [isSmall, setIsSmall] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(props.isButton==undefined){
      setIsSmall(true);
      handleClickOpen() ;
    } 
 }, []);

  return (
    <>
      {props.isButton===undefined ? <></>:props.isButton ? <Button onClick={handleClickOpen} sx={{
        px: 2,
        m:0,
        backgroundColor: `${PALLETE.ORANGE} !important`,
        color: `${PALLETE.WHITE}`,
      }}>{props.btnOpen}</Button> :
        <Link onClick={handleClickOpen} underline="hover" >
          <MyOpenDialog>{props.btnOpen}</MyOpenDialog>
        </Link>}
        <Dialog fullWidth maxWidth={isSmall ? 'sm' : 'md'} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent sx={{ p: 0, height: isSmall ? '24rem' : '42rem' }}>
            <MyDetailsDiv>
              <DialogTitle sx={{ fontSize: isSmall ? 24 : 35, pl: "3rem"}}>{props.title}</DialogTitle>
              <DialogContent style={{ paddingLeft: "2rem" }}>
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
    </>
  );
};

export default GlobalModel;
