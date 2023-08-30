import React, { useState, useEffect } from 'react';
import GlobalModel from '../components/GlobalModal';
import NewOrderForm from '../pages/newOrderForm/NewOrderForm';
// import giftsImg from '../img/gifts.png';
import giftsImg from '../img/circles.png'

import { PALLETE } from '../config/config';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

interface GlobalErrorModalProps {
  // showError: boolean;
  onClose: () => void;
}
const GlobalErrModal: React.FC<GlobalErrorModalProps> = (props) => {
    const handleClickClose = () => {
      props.onClose();
    }
  return (
    <>
    <GlobalModel  title = { "Error"} img = { giftsImg } txtSide = { "Oops-something went worng"} >
    <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
    <p dangerouslySetInnerHTML={{ __html: `
    User not found- please try again later
      <br />
      contact our support at:
      <br />
      support@myapp.com
  ` }} />
  </div>
    <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            sx={{
              mt: 2,
              backgroundColor: `${PALLETE.YELLOW} !important`,
              width: "30%",
              color: `${PALLETE.WHITE} !important`,
            }}
            onClick={handleClickClose}
          >
            Close
          </Button>
        </div>
      </GlobalModel>     
      </>
  )
};

export default GlobalErrModal;


