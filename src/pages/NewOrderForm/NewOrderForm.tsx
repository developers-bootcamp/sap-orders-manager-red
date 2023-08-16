import React, { useState } from "react";
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
import { json } from "node:stream/consumers";

const schema = Yup.object().shape({
  cvc: Yup.string().required("number is a required field"),
  expireOn: Yup.string().required("expireOn is a required field"),
  creditCard: Yup.string().required("creditCard is a required field"),
});

const NewOrderForm = () => {
  const [productId, setProductId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [currency, setCurrency] = useState("DOLLAR");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [productListToBuy, setProductListToBuy] = useState<IProductDTO[]>([]);
  const [order, setOrder] = useState<IOrder>({
    employeeId: {
      id: "string",
      fullName: "string",
      password: "string",
      address: {
        phone: "string",
        name: "string",
        email: "string",
      },
      roleId: {
        id: "string",
        name: "ADMIN",
        desc: "string",
        auditData: {
          createDate: "2023-08-11",
          updateDate: "2023-08-11",
        },
      },
      companyId: {
        id: "string",
        name: "string",
        currency: "EURO",
        auditData: {
          createDate: "2023-08-11",
          updateDate: "2023-08-11",
        },
      },
      auditData: {
        createDate: "2023-08-11",
        updateDate: "2023-08-11",
      },
    },
    customerId: {
      id: customerId,
      fullName: "string",
      password: "string",
      address: {
        phone: "string",
        name: "string",
        email: "string",
      },
      roleId: {
        id: "string",
        name: "ADMIN",
        desc: "string",
        auditData: {
          createDate: "2023-08-11",
          updateDate: "2023-08-11",
        },
      },
      companyId: {
        id: "string",
        name: "string",
        currency: "EURO",
        auditData: {
          createDate: "2023-08-11",
          updateDate: "2023-08-11",
        },
      },
      auditData: {
        createDate: "2023-08-11",
        updateDate: "2023-08-11",
      },
    },
    totalAmount: 0,
    orderItemsList: [],
    orderStatus: "NEW",
    companyId: {
      id: "string",
      name: "string",
      currency: "EURO",
      auditData: {
        createDate: "2023-08-11",
        updateDate: "2023-08-11",
      },
    },
    creditCardNumber: 0,
    expireOn: new Date(),
    cvc: 0,
    notificationFlag: true,
    auditData: {
      createDate: "2023-08-11",
      updateDate: "2023-08-11",
    },
  });
  const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(
    (state) => state.currencyReducer
  ).listOfCurrencies;

  const handleNewOrder = async (values: any) => {
    console.log("in function handleNewOrder");
    let updateOrder = await { ...order };
    updateOrder.creditCardNumber = await values.creditCard;
    updateOrder.cvc = await values.cvc;
    updateOrder.expireOn = await values.expireOn;
    await setOrder({ ...updateOrder });
    console.log(order);
    await axios
      .post(`http://localhost:8080/order/`, order)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(values);
  };

  const setProductFrom = (selectProductId: string) => {
    setProductId(selectProductId);
    // console.log(selectProductId);
    // console.log("productId",productId);
  };

  const setCustomerFrom = (selectCustomerId: string) => {
    setCustomerId(selectCustomerId);
    setProductId("");
    let updatrOrder = order;
    if (updatrOrder.customerId) updatrOrder.customerId.id = selectCustomerId;
    setOrder(updatrOrder);
  };

  const handleAddProduct = async (state: any) => {
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
          companyId: {
            id: "string",
            name: "string",
            currency: "EURO",
            auditData: {
              createDate: "2023-08-11",
              updateDate: "2023-08-11",
            },
          },
          auditData: {
            createDate: "2023-08-11",
            updateDate: "2023-08-11",
          },
        },
        inventory: 0,
        companyId: {
          id: "string",
          name: "string",
          currency: "EURO",
          auditData: {
            createDate: "2023-08-11",
            updateDate: "2023-08-11",
          },
        },
        auditData: {
          createDate: "2023-08-11",
          updateDate: "2023-08-11",
        },
      },
      amount: 0,
      quantity: parseInt(quantity.toString()),
    };
    if (updatedProductList.orderItemsList == undefined) {
      updatedProductList.orderItemsList = [];
    }
    await updatedProductList.orderItemsList.push(newOrderItem);
    setOrder(updatedProductList);
    console.log(order);

    try {
      const response = await axios.post(
        `http://localhost:8080/order/calculateOrderAmount`,
        updatedProductList // Use the updatedProductList here
      );
      console.log(response);
      setProductListToBuy([...productListToBuy, response.data[0]]);
      updatedProductList.orderItemsList[
        updatedProductList.orderItemsList.length - 1
      ].amount = response.data[0].amount;
      setOrder(updatedProductList);
      setPrice(response.data[0].amount + price);
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
              <Grid item xs={12} sm={8}>
                <FormHelperText>customer</FormHelperText>
                <MyArrowIcon>
                  <GlobalAutoComplete
                    path={`/user/getNamesOfCustomersByPrefix`}
                    whatChoose={(event: string) => setCustomerFrom(event)}
                  ></GlobalAutoComplete>
                </MyArrowIcon>
                <MyMsdError>
                  <ErrorMessage name="customer" component="div" />
                </MyMsdError>
                <FormHelperText sx={{ mt: 2 }}>product</FormHelperText>
                <GlobalAutoComplete
                  path={"/product/names"}
                  whatChoose={(event: string) => setProductFrom(event)}
                ></GlobalAutoComplete>
                <MyMsdError>
                  <ErrorMessage name="product" component="div" />
                </MyMsdError>
                {/* <FormHelperText sx={{ mt: 1 }}>product</FormHelperText>
              <GlobalAutoComplete path={"/product/names"}></GlobalAutoComplete>
              <MyMsdError>
                <ErrorMessage name="product" component="div" />
              </MyMsdError> */}
                <MyFieldContainer sx={{ mt: 1 }}>
                  <Grid item xs={5} sm={5.5}>
                    <FormHelperText>Quantity:</FormHelperText>
                    <Field
                      fullWidth
                      type="number"
                      name="quantity"
                      as={TextField}
                      value={quantity}
                      onChange={(event: any) => {
                        setQuantity(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} sx={{ mr: 5, ml: 2 }}>
                    <FormHelperText>Currency</FormHelperText>
                    <Autocomplete
                      fullWidth
                      value={currency}
                      options={listOfCurrencies.map((c: string) => c)}
                      inputValue={currency}
                      onInputChange={(event: any, newInputValue: any) => {
                        setCurrency(newInputValue);
                      }}
                      renderInput={(params: any) => <TextField {...params} />}
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
                    onClick={handleAddProduct}
                  >
                    Add
                  </Button>
                </Typography>{" "}
              </Grid>

              <Grid item xs={12} sm={4}>
                <h3>
                  price: <span>{price}$</span>
                </h3>
                <div>
                  <Grid container spacing={2}>
                    <h5>productList:</h5>
                  </Grid>
                  {productListToBuy != undefined &&
                    productListToBuy.map((item, index) => (
                      <Grid key={index} container spacing={2} sx={{ mb: 2 }}>
                        <Typography sx={{ mr: 1 }}>{item.name}</Typography>
                        <Typography sx={{ mr: 1 }}> {item.amount}</Typography>
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
                <Field
                  fullWidth
                  type="number"
                  name="creditCard"
                  as={TextField}
                />
              </MyTxtField>
              {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}
              <MyFieldContainer sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <FormHelperText>Expire on:</FormHelperText>
                  <Field
                    fullWidth
                    type="month"
                    name="expireOn"
                    as={TextField}
                  />
                  {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}
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
                // onClick={(values)=>handleNewOrder(values)}
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
