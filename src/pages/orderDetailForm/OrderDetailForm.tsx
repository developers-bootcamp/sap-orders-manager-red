import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { FormHelperText } from "@mui/material";
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import { MyArrowIcon, MyFieldContainer, MyMsdError, MyTxtField } from "./OrderDetailForm.style";
import Divider from "@mui/material/Divider";
import { PALLETE } from "../../config/config";
import GlobalAutoComplete from "../../components/GlobalAutoComplete";
import { RootState, useAppDispatch } from "../../redux/store";
import IOrder from "../../interfaces/IOrder";
import { useSelector } from "react-redux";
import ArrowCircleUpSharp from "@mui/icons-material/ArrowCircleUpSharp";
import { getAllOrders, updateOrder } from "../../axios/orderAxios";
import { ICurrencyState } from "../../redux/slices/sliceCurrency";
import IUser from "../../interfaces/IUser";
import axios from "axios";
import IProductDTO from "../../interfaces/IproductDTO";

const schema = Yup.object().shape({
  customer: Yup.string().required("customer is a required field"),
  product: Yup.string().required("customer is a required field"),
});


const OrderDetailForm = (props: any) => {
  const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).listOfCurrencies;
  const [currectOrder, setCurrectOrder] = useState<IOrder>(props.order)
  const [isOpen, setIsOpen] = useState(false);
  const [currencyFlag, setCurrencyFlag] = useState<boolean>(true);
  const [productId, setProductId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>(currectOrder.companyId?.id || "");
  const [currency, setCurrency] = useState(currectOrder.currency);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(currectOrder.totalAmount || 0);
  const [productListToBuy, setProductListToBuy] = useState<IProductDTO[]>([]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const cancelOrder = () => {
    debugger
    let orderUpdate: IOrder = { ...currectOrder }
    orderUpdate.orderStatus = "CANCELLED"
    updateOrder(orderUpdate)
      .then(res => {
        toggleOpen()
      })
      .catch(err => {
        console.error(`cancel error`, err);
      })
  }

  const saveChanges = () => {
    debugger
    updateOrder(currectOrder)
      .then(res => {
        toggleOpen()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const setProductFrom = (selectProductId: any) => {
    setProductId(selectProductId);
  };

  const delProd = (index: number) => {
    let updatedProductList = { ...currectOrder };
    let product: any
    if (updatedProductList.orderItemsList !== undefined) {
      product = updatedProductList.orderItemsList[index]
      updatedProductList.orderItemsList = [...updatedProductList.orderItemsList.filter((x, i) => i !== index)]
    }
    if (updatedProductList.totalAmount !== undefined) {
      updatedProductList.totalAmount = price - product.amount
      setPrice(price - product.amount);
    }
    setCurrectOrder({ ...updatedProductList })
    if (updatedProductList.orderItemsList !== undefined)
      setProductListToBuy((prev) => [...prev.filter((x, i) => i !== index)])
  }

  const setCustomerFrom = (selectCustomerId: any) => {
    setCustomerId(selectCustomerId);
    setProductId("");
    let updatrOrder = currectOrder;
    if (updatrOrder.customerId) updatrOrder.customerId.id = selectCustomerId;
    setCurrectOrder(updatrOrder);
  };

  const handleAddProduct = async (state: any) => {
    setCurrencyFlag(true)
    let updatedProductList = await { ...currectOrder };
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
    setCurrectOrder(updatedProductList);

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
      setCurrectOrder(updatedProductList);
      if (updatedProductList.totalAmount !== undefined)
        setPrice(updatedProductList.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        creditCardNumber: `${currectOrder.creditCardNumber}`,
        expiryOn: `${currectOrder.expireOn}`,
        cvc: `${currectOrder.cvc}`
      }}
      onSubmit={saveChanges}
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
                  value={currectOrder.customerId?.fullName}
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
                price: <span>{price.toFixed(2)}{currency}</span>
              </h3>
              <div>
                <Grid container rowSpacing={3}>
                  <h5>Product List:</h5>
                </Grid>
                {currectOrder.orderItemsList != undefined &&
                  currectOrder.orderItemsList.map((item, index) => (
                    <Grid key={index} container rowSpacing={2} sx={{ mb: 2 }}>
                      <Typography sx={{ mr: 1 }}>{item.productId?.name}</Typography>
                      <Typography sx={{ mr: 1 }}>{item.amount?.toFixed(2)}</Typography>
                      <Typography sx={{ mr: 0 }}>{item.quantity}</Typography>
                      <Button sx={{ mt: 0, p: 0 }} onClick={() => delProd(index)}>X</Button>
                    </Grid>
                  ))}
              </div>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 3 }} />
          <Typography>Paid with a credit card ending in digits: {currectOrder.creditCardNumber?.substring(12)}</Typography>

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
              onClick={cancelOrder}
              sx={{
                mt: 2,
                backgroundColor: `${PALLETE.ORANGE} !important`,
                width: "45%",
                color: `${PALLETE.WHITE} !important`,
              }}
              disabled={!isValid}
            >
              Cancel Order
            </Button>
            <Button
              onClick={saveChanges}
              sx={{
                mt: 2,
                left: '10% !important',
                backgroundColor: `${PALLETE.GREEN} !important`,
                width: "45%",
                color: `${PALLETE.WHITE} !important`,
              }}
              disabled={!isValid}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrderDetailForm;


