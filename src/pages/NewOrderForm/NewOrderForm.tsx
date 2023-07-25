import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Typography } from "@mui/material";
import { FormHelperText } from "@mui/material";
import {
  MyArrowIcon,
  MyFieldContainer,
  MyMsdError,
  MyTxtField,
} from "./NewOrderForm.style";
import Divider from "@mui/material/Divider";
import { PALLETE } from "../../config/config";
import GlobalAutoComplete from "../../components/GlobalAutoComplete";
import IProduct from "../../interfaces/IProduct";

const schema = Yup.object().shape({
  customer: Yup.string().required("customer is a required field"),
  product: Yup.string().required("customer is a required field"),
});

const NewOrderForm: React.FC = () => {
  const handleNewOrder = (values: any) => {
    //  API call of new order here
    console.log(values);
  };

  const [productList ,setProductList]=useState<IProduct[]>([]);
  const [product,setProduct] =useState<IProduct>();

  const setProductFrom=(selectProduct:IProduct)=>{
    setProduct(selectProduct);
  }

  const handleAddProduct=()=>{
    if(product)
      setProductList([...productList,product]);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        fullName: "",
        companyName: "",
        password: "",
        email: "",
        agree: false,
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
                ></GlobalAutoComplete>
              </MyArrowIcon>
              <MyMsdError>
                <ErrorMessage name="customer" component="div" />
              </MyMsdError>

              <FormHelperText sx={{ mt: 2 }}>product</FormHelperText>
              <GlobalAutoComplete path={"/product/names"}></GlobalAutoComplete>
              <MyMsdError>
                <ErrorMessage name="product" component="div" />
              </MyMsdError>

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
                  onClick={handleAddProduct}
                >
                  Add
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <h3>
                price: <span>34.00 $</span>
              </h3>
              <div>
                <Grid container spacing={2}>
                  <h5>productList:</h5>
                </Grid>
                {productList.map((item, index) => (
                  <Grid key={index} container spacing={2} sx={{ mb: 2 }}>
                    <Typography sx={{ mr: 1 }}>{item.name}</Typography>
                    <Typography sx={{ mr: 1 }}>{item.price}</Typography>
                    <Typography sx={{ mr: 0 }}>{item.quantity}</Typography>
                  </Grid>
                ))}
              </div>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 3 }} />

          <Grid sx={{ width: 400 }}>
            <FormHelperText>Credit card number</FormHelperText>
            <MyTxtField>
              <Field fullWidth type="number" name="creditCard" as={TextField} />
            </MyTxtField>
            {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}
            <MyFieldContainer sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormHelperText>Expire on:</FormHelperText>
                <Field fullWidth type="month" name="expireOn" as={TextField} />
                {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mr: 5, ml: 2 }}>
                <FormHelperText>Cvc:</FormHelperText>
                <Field fullWidth type="number" name="Cvc" as={TextField} />
              </Grid>
            </MyFieldContainer>
            <Button
              sx={{
                mt: 2,
                backgroundColor: `${PALLETE.YELLOW} !important`,
                width: "30%",
                color: `${PALLETE.WHITE} !important`,
              }}
              type="submit"
              disabled={!isValid}
            >
              Buy Now
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default NewOrderForm;
