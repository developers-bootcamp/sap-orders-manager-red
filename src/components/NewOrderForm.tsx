import React from 'react';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Typography } from '@mui/material';
import { FormHelperText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import useStylesForOrders from '../styles/orders.style';
import Divider from '@mui/material/Divider';

const schema = Yup.object().shape({

    customer: Yup.string().required('customer is a required field'),
    product: Yup.string().required('customer is a required field'),

});
const NewOrderForm: React.FC = () => {
    const classes = useStylesForOrders();

    // const [showPassword, setShowPassword] = React.useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    const handleNewOrder = (values: any) => {
        //  API call of new order here
        console.log(values);
    };

    //*just for now! should be from the server*\\
    const optionsForSelect = [{ label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }];

    const productList = [
        { name: 'Collage', price: '$10', quantity: 'x 2' },
        { name: 'Photo albom', price: '$20', quantity: 'x 3' }
        // ... more items
    ];

    //*\\

    return (
        <Formik
            validationSchema={schema}
            initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
            onSubmit={handleNewOrder}
        >
            {({ isValid }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <FormHelperText>customer</FormHelperText>
                            <Field
                                component={Autocomplete}
                                disablePortal
                                id="autoCompleteCustomer"
                                options={optionsForSelect}
                                sx={{ mr: 8 }}
                                renderInput={(params: any) => <TextField {...params} placeholder={optionsForSelect[0].label} />}
                                classes={{
                                    clearIndicator: classes.arrowIcon,
                                }}
                            />
                            <ErrorMessage className={classes.msdError} name="customer" component="div" />

                            <FormHelperText sx={{ mt: 2 }}>product</FormHelperText>
                            <Field
                                component={Autocomplete}
                                disablePortal
                                id="autoCompleteProduct"
                                options={optionsForSelect}
                                sx={{ mr: 8 }}
                                renderInput={(params: any) => <TextField {...params} placeholder={optionsForSelect[0].label} />}
                            />
                            <ErrorMessage className={classes.msdError} name="product" component="div" />

                            <Typography sx={{ mr: 8 }}>
                                <Button fullWidth sx={{ mt: 2 }} className={classes.btnAdd} type="submit" disabled={!isValid}>
                                    Add
                                </Button>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h3>price: <span>34.00 $</span></h3>
                            <div>
                                <Grid container spacing={2}><h5>productList:</h5></Grid>
                                {
                                    productList.map((item, index) => (
                                        <Grid key={index} container spacing={2} sx={{ mb: 2 }}>
                                            <Typography sx={{ mr: 1 }}>{item.name}</Typography>
                                            <Typography sx={{ mr: 1 }}>{item.price}</Typography>
                                            <Typography sx={{ mr: 0 }}>{item.quantity}</Typography>
                                        </Grid>
                                    ))
                                }
                            </div>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mt: 3 }} />

                    <Grid sx={{ width: 400 }}>
                        <FormHelperText>Credit card number</FormHelperText>
                        <Field className={classes.txtField} type="number" name="creditCard" as={TextField} />
                        {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}

                        <div className={classes.fieldContainer}>
                            <div>
                                <FormHelperText>Expire on:</FormHelperText>
                                <Field className={`${classes.spalltxtField} ${classes.halfField}`} type="number" name="expireOn" as={TextField} />
                                {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}
                            </div>
                            <div>
                                <FormHelperText className={classes.helperText}>Cvc:</FormHelperText>
                                <Field className={`${classes.spalltxtField} ${classes.halfField}`} type="number" name="Cvc" as={TextField} />
                            </div>
                        </div>
                        <Button sx={{ mt: 2 }} className={classes.btnBuyNow} type="submit" disabled={!isValid}>
                            Buy Now
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}
export default NewOrderForm;