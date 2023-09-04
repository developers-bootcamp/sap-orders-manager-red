import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Typography, Autocomplete } from "@mui/material";
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
import IProductDTO from "../../interfaces/IproductDTO";

import { ICurrencyState } from "../../redux/slices/sliceCurrency";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import IOrder from "../../interfaces/IOrder";
import { useNavigate } from "react-router-dom";
import IOrderItem from "../../interfaces/IOrderItem";

const schema = Yup.object().shape({
  cvc: Yup.string().required("number is a required field"),
  expireOn: Yup.string().required("expireOn is a required field"),
  creditCard: Yup.string().required("creditCard is a required field"),
});

const NewOrderForm = () => {
  const [currencyFlag, setCurrencyFlag] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [currency, setCurrency] = useState("$");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [productListToBuy, setProductListToBuy] = useState<IProductDTO[]>([]);
  const [order, setOrder] = useState<IOrder>({
    employeeId: {
      id: "string",
    },
    customerId: {
      id: customerId,
    },
    totalAmount: 0,
    orderItemsList: [],
    orderStatus: "NEW",
    companyId: {
      id: "string",
    },
    currency: currency,
    creditCardNumber: "0",
    expireOn: "",
    cvc: 0,
    notificationFlag: true,
  });
  const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(
    (state) => state.currencyReducer
  ).listOfCurrencies;


  const handleNewOrder = async (values: any) => {
    let updateOrder = await { ...order };
    updateOrder.creditCardNumber = values.creditCard;
    updateOrder.cvc = values.cvc;
    updateOrder.expireOn = values.expireOn;
    setOrder({ ...updateOrder });
    await axios
      .post(`http://localhost:8080/order/`, updateOrder)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setProductFrom = (selectProductId: any) => {
    setProductId(selectProductId);
  };

  const delProd = (index: number) => {
    let updatedProductList = { ...order };
    let product: any
    if (updatedProductList.orderItemsList !== undefined) {
      product = updatedProductList.orderItemsList[index]
      updatedProductList.orderItemsList = [...updatedProductList.orderItemsList.filter((x, i) => i !== index)]
    }
    if (updatedProductList.totalAmount !== undefined) {
      updatedProductList.totalAmount = price - product.amount
      setPrice(price - product.amount);
    }
    setOrder({ ...updatedProductList })
    if (updatedProductList.orderItemsList !== undefined)
      setProductListToBuy((prev) => [...prev.filter((x, i) => i !== index)])
  }

  const setCustomerFrom = (selectCustomerId: any) => {
    setCustomerId(selectCustomerId);
    setProductId("");
    let updatrOrder = order;
    if (updatrOrder.customerId) updatrOrder.customerId.id = selectCustomerId;
    setOrder(updatrOrder);
  };

  const handleAddProduct = async (state: any) => {
    setCurrencyFlag(true)
    let updatedProductList = await { ...order };
    let newOrderItem = await {
      productId: {
        id: productId,
        name: "string",
        desc: "string",
        price: 0,
        discount: 0,
        discountType: "PERCENTAGE",
        productCategoryId: {
          id: "string",
          name: "string",
          desc: "string",
        },
        inventory: 0,
      },
      amount: 0,
      quantity: quantity,
    };
    if (updatedProductList.orderItemsList == undefined) {
      updatedProductList.orderItemsList = [];
    }

    debugger
    let flag = false
    for (let i = 0; i < updatedProductList.orderItemsList.length; i++) {
      if (updatedProductList.orderItemsList[i].productId?.id === newOrderItem.productId.id) {
        updatedProductList.orderItemsList[i].quantity += quantity
        flag = true
        break
      }
    }

    if (flag === false)
      await updatedProductList.orderItemsList.push(newOrderItem);

    updatedProductList.currency = currency;
    setOrder(updatedProductList);

    try {
      const response = await axios.post(
        `http://localhost:8080/order/calculateOrderAmount`,
        updatedProductList
      );
      let data = [...response.data]
      setProductListToBuy(data.slice(0, data.length - 1));

      for (let i = 0; i < updatedProductList.orderItemsList.length; i++) {
        updatedProductList.orderItemsList[i].amount = data[i].amount
      }

      updatedProductList.totalAmount = response.data[data.length - 1].amount
      setOrder(updatedProductList);
      if (updatedProductList.totalAmount !== undefined)
        setPrice(updatedProductList.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ cvc: "", expireOn: "", creditCard: "" }}
        onSubmit={handleNewOrder}
      >
        {({ isValid }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <FormHelperText>Customer</FormHelperText>
                <MyArrowIcon>
                  <GlobalAutoComplete
                    path={`/user/getNamesOfCustomersByPrefix`}
                    whatChoose={(event: any) => setCustomerFrom(event.id)}
                  ></GlobalAutoComplete>
                </MyArrowIcon>
                <MyMsdError>
                  <ErrorMessage name="customer" component="div" />
                </MyMsdError>
                <FormHelperText sx={{ mt: 2 }}>Product</FormHelperText>
                <GlobalAutoComplete
                  path={"/product/names"}
                  whatChoose={(event: any) => setProductFrom(event.id)}
                ></GlobalAutoComplete>
                <MyMsdError>
                  <ErrorMessage name="product" component="div" />
                </MyMsdError>
                <FormHelperText sx={{ mt: 2 }}>Quantity</FormHelperText>
                <Field
                  sx={{ height: 50, width: 300 }}
                  type="number"
                  name="quantity"
                  as={TextField}
                  value={quantity}
                  onChange={(event: any) => {
                    setQuantity(parseInt(event.target.value));
                  }}
                />
                <Typography sx={{ mr: 8 }}>
                  <Button
                    sx={{
                      width: 300,
                      mt: 2,
                      backgroundColor: `${PALLETE.BLUE} !important`,
                      color: `${PALLETE.WHITE} !important`,
                    }}
                    onClick={handleAddProduct}
                  >
                    Add
                  </Button>
                </Typography>{" "}
              </Grid>

              <Grid item xs={12} sm={5}>
                <FormHelperText>Currency</FormHelperText>
                <Autocomplete
                  fullWidth
                  disabled={currencyFlag}
                  value={currency}
                  options={listOfCurrencies.map((c: string) => c)}
                  inputValue={currency}
                  onInputChange={(event: any, newInputValue: any) => {
                    setCurrency(newInputValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
                <h3>
                  price: <span>{price}{currency}</span>
                </h3>
                <div>
                  <Grid container rowSpacing={3}>
                    <h5>Product List:</h5>
                  </Grid>
                  {productListToBuy != undefined &&
                    productListToBuy.map((item, index) => (
                      <Grid key={index} container rowSpacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ mr: 1 }}>{item.name}</Typography>
                        <Typography sx={{ mr: 1 }}>{item.amount}</Typography>
                        <Typography sx={{ mr: 0 }}>{item.quantity}</Typography>
                        <Button sx={{ mt: 0, p: 0 }} onClick={() => delProd(index)}>X</Button>
                      </Grid>
                    ))}
                </div>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 3 }} />

            <Grid sx={{ width: 400 }}>
              <FormHelperText>Credit card number</FormHelperText>
              <MyTxtField>
                <Field
                  fullWidth
                  type="number"
                  name="creditCard"
                  as={TextField}
                />
              </MyTxtField>
              <MyFieldContainer sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <FormHelperText>Expire on:</FormHelperText>
                  <Field
                    fullWidth
                    type="month"
                    name="expireOn"
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mr: 5, ml: 2 }}>
                  <FormHelperText>Cvc:</FormHelperText>
                  <Field fullWidth type="number" name="cvc" as={TextField} />
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
    </>
  );
};

export default NewOrderForm;
