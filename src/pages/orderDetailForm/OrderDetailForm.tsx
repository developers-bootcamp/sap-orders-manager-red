import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { FormHelperText } from "@mui/material";
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import {
  MyArrowIcon,
  MyFieldContainer,
  MyMsdError,
  MyTxtField,
} from "./OrderDetailForm.style";
import Divider from "@mui/material/Divider";
import { PALLETE } from "../../config/config";
import GlobalAutoComplete from "../../components/GlobalAutoComplete";
import { RootState, useAppDispatch } from "../../redux/store";
import IOrder from "../../interfaces/IOrder";
import { setOrder } from "../../redux/slices/sliceOrder";
import { useSelector } from "react-redux";
import ArrowCircleUpSharp from "@mui/icons-material/ArrowCircleUpSharp";
import IOrderItem from "../../interfaces/IOrderItem";
import { updateOrder } from "../../axios/orderAxios";
import { ICurrencyState } from "../../redux/slices/sliceCurrency";
import IUser from "../../interfaces/IUser";

// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
// import { FormHelperText } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
// import { MyArrowIcon, MyFieldContainer, MyMsdError, MyTxtField } from './NewOrderForm.style';
// import { PALLETE } from '../../config/config';

const schema = Yup.object().shape({
  customer: Yup.string().required("customer is a required field"),
  product: Yup.string().required("customer is a required field"),
});


const NewOrderForm: React.FC = () => {

  const listOfCurrencies:string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).listOfCurrencies;

  const [currency, setCurrency] = React.useState("DOLLAR");


  const handleNewOrder = (values: any) => {
    //  API call of new order here
    console.log(values);
  };

  const productList = [
    { name: "Collage", price: "$10", quantity: "x 2" },
    { name: "Photo albom", price: "$20", quantity: "x 3" },
    // ... more items
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    let order: IOrder = {
      id: "1",
      employeeId: { id: "1", fullName: "rooti" },
      customerId: { id: "2", fullName: "custRoti" },
      totalAmount: 60,
      orderItemsList: [
        { productId: { id: "1", name: "product1" }, amount: 20, quantity: 2 },
        { productId: { id: "2", name: "product2" }, amount: 40, quantity: 1 },
      ],
      orderStatus: "done",
      companyId: { name: "kamatek" },
      creditCardNumber: 1111222233334444,
      expireOn: new Date,
      cvc: 123,
    }

    dispatch(setOrder(order))
  }, [])

  let currectOrder: IOrder = useSelector((o: any) => o.orderReducer.order)


  const keepProduct = (event: any) => {

  }

  const keepCustomer = (event: any) => {

  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const cancelOrder=(id:any)=>{
    
  }

  const dellProduct = (id: any, amount: any) => {
    let order: IOrder = { ...currectOrder }
    order.orderItemsList = currectOrder.orderItemsList?.filter(o => o.productId?.id !== id)
    order.totalAmount = (currectOrder.totalAmount ?? 0) - amount
    dispatch(setOrder(order))
  }

  const saveChanges = (event: any) => {
    updateOrder(currectOrder).then(res => {
      // פה יהיה את כל העדכון של ההזמנה
      toggleOpen()
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        creditCardNumber: `${currectOrder.creditCardNumber}`,
        expiryOn: `${currectOrder.expireOn}`,
        cvc: `${currectOrder.cvc}`
      }}
      onSubmit={handleNewOrder}
    >
      {({ isValid }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <FormHelperText>customer</FormHelperText>
              <MyArrowIcon>
                <GlobalAutoComplete
                  path={`/user/getNamesOfCustomersByPrefix`}
                  onChangeSelect={keepProduct}
                ></GlobalAutoComplete>
              </MyArrowIcon>
              <MyMsdError>
                <ErrorMessage name="customer" component="div" />
              </MyMsdError>
{/* sx={{ mt: 1, mr: 12, ml: 0 }} */}
              <MyFieldContainer >
                <Grid item xs={12} sm={12}>
                  <FormHelperText>product</FormHelperText>
                  <GlobalAutoComplete path={"/product/names"} onChangeSelect={keepCustomer}></GlobalAutoComplete>
                  <MyMsdError>
                    <ErrorMessage name="product" component="div" />
                  </MyMsdError>              
                  </Grid>
                
              </MyFieldContainer>
              <MyFieldContainer sx={{ mt: 1 }}>
                <Grid item xs={5} sm={5.5}>
                  <FormHelperText>Quantity:</FormHelperText>
                  <Field fullWidth type="number" name="quantity" as={TextField} />
                </Grid>
                <Grid item xs={6} sm={4} sx={{ mr: 5, ml: 2 }}>
                  <FormHelperText>Currency</FormHelperText>
                  <Autocomplete
                    fullWidth
                    value={currency}
                    defaultValue={currency}
                    options={listOfCurrencies.map((c: string) => c)}
                    inputValue={currency}
                    onInputChange={(event, newInputValue) => {
                      setCurrency(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} />
                    )}
                  />
                </Grid>
              </MyFieldContainer>

              <Typography sx={{ mr: 8 }}>
                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: `${PALLETE.BLUE} !important`,
                    color: `${PALLETE.WHITE} !important`,
                  }}
                  type="submit"
                  disabled={!isValid}
                >
                  Add
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <h3>
                price: <span>{currectOrder.totalAmount} $</span>
              </h3>
              <div>
                <Grid container spacing={2}>
                  <h5>productList:</h5>
                </Grid>
                {currectOrder.orderItemsList?.map((item, index) => (
                  <Grid key={index} container spacing={2} sx={{ mb: 2 }}>
                    <Typography sx={{ mr: 1 }}>{item.productId?.name}</Typography>
                    <Typography sx={{ mr: 1 }}>{item.amount}</Typography>
                    <Typography sx={{ mr: 0 }}>{item.quantity}</Typography>
                    <Button sx={{ mt: 0, p: 0 }} onClick={() => dellProduct(item.productId?.id, item.amount)}>X</Button>
                  </Grid>
                ))}
              </div>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 3 }} />
          <Typography>Paid with a credit card ending in digits: {currectOrder.creditCardNumber?.toString().substring(12)}</Typography>

          <div>
            <div>


              <Button sx={{ color: PALLETE.ORANGE }} startIcon={<ArrowCircleUpSharp />} onClick={toggleOpen}>{isOpen ? 'Close' : ' change credit card details'}
              </Button>
              {isOpen && <div>
                <Grid sx={{ width: 400 }}>
                  <FormHelperText>Credit card number</FormHelperText>
                  <MyTxtField>
                    <Field fullWidth type="number" name="creditCardNumber" as={TextField} />
                  </MyTxtField>
                  <MyFieldContainer sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <FormHelperText>Expire on:</FormHelperText>
                      <Field fullWidth type="month" name="expiryOn" as={TextField} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mr: 5, ml: 2 }}>
                      <FormHelperText>Cvc:</FormHelperText>
                      <Field fullWidth type="number" name="cvc" as={TextField} />
                    </Grid>

                  </MyFieldContainer></Grid>
              </div>}
            </div>
            <Button
            onClick={()=>cancelOrder(currectOrder.id)}
              sx={{
                mt: 2,
                backgroundColor: `${PALLETE.ORANGE} !important`,
                width: "45%",
                color: `${PALLETE.WHITE} !important`,
              }}
              type="submit"
              disabled={!isValid}
            >
              Cancel Order
            </Button>
            <Button
              sx={{
                mt: 2,
                left: '10% !important',
                backgroundColor: `${PALLETE.GREEN} !important`,
                width: "45%",
                color: `${PALLETE.WHITE} !important`,
              }}
              type="submit"
              disabled={!isValid}
              onClick={(e) => saveChanges(e)}
            >
              Save Changes
            </Button>

          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewOrderForm;


