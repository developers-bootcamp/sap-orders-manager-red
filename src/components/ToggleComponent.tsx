import React, { useState } from 'react';
import CreditCardForm from './CreditCardForm';
import { FormHelperText } from "@mui/material";
import { Grid, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MyArrowIcon,
  MyFieldContainer,
  MyMsdError,
  MyTxtField,
} from "../pages/orderDetailForm/OrderDetailForm.style";
// ./OrderDetailForm.style
const ToggleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? 'Close' : 'change credit card details'}
      </button>
      {isOpen && <div>
        {/* <CreditCardForm></CreditCardForm> */}
        <Grid sx={{ width: 400 }}>
            <FormHelperText>Credit card number</FormHelperText>
            <MyTxtField>
              <Field fullWidth type="number" name="creditCard" as={TextField} />
            </MyTxtField>
            <MyFieldContainer sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormHelperText>Expire on:</FormHelperText>
                <Field fullWidth type="month" name="expireOn" as={TextField} />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mr: 5, ml: 2 }}>
                <FormHelperText>Cvc:</FormHelperText>
                <Field fullWidth type="number" name="Cvc" as={TextField} />
              </Grid>
              
            </MyFieldContainer></Grid>
        </div>}
    </div>
  );
};

export default ToggleComponent;