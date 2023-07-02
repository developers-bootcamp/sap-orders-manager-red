
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox, DialogTitle, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material';
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

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleNewOrder = (values: any) => {
        //  API call of new order here
        console.log(values);
    };

    //*just for now! should be from the server*\\
    const optionsForSelect=[ { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }];

    const productList = [
        { name: 'collage', price: '$10', quantity: 'x 2' },
        { name: 'photo albom', price: '$20', quantity: 'x 3' }
        // ... more items
        ];
    
    //*\\
   
    return (
        <div style={{ display: 'flex' , flexDirection:"row-reverse"}}>
            <div style={{width:"200px", padding:"10px"}}>
             price :<h5>34.00 $</h5>
                <div>-
                    {productList.map((item, index) => (
                        <div key={index}>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>
                        </div>
                        ))}
                </div>
            </div>
            <div style={{ display: 'inline-block' }}>
            <Formik
                validationSchema={schema}
                initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
                onSubmit={handleNewOrder}
            >
                {({ isValid }) => (
                  
                    <Form>
                        {/* <FormHelperText>Full name</FormHelperText>
                        <Field className={classes.txtField} type="text" name="fullName" as={TextField} />
                        <ErrorMessage className={classes.msdError} name="fullName" component="div" /> */}

                        <FormHelperText>cusomer</FormHelperText>
                        <Field
                            component={Autocomplete}
                            disablePortal
                            id="autoCompleteCustomer"
                            options={optionsForSelect}
                            sx={{ width: 300 }}
                            renderInput={(params:any) => <TextField {...params} placeholder={optionsForSelect[0].label}/>}
                            classes={{
                                clearIndicator: classes.arrowIcon,
                              }}
                        />
                        <ErrorMessage className={classes.msdError} name="customer" component="div" />
                        
                        <div style={{ }}>
                             <FormHelperText>product</FormHelperText>
                        <Field
                            component={Autocomplete}
                            disablePortal
                            id="autoCompleteProduct"
                            options={optionsForSelect}
                            sx={{ width: 300 }}
                            renderInput={(params:any) => <TextField {...params} placeholder={optionsForSelect[0].label} />}
                        />
                        <ErrorMessage className={classes.msdError} name="product" component="div" />
                        </div>
                       
                        <br></br>
                        <Button className={classes.btnAdd} type="submit" disabled={!isValid}>
                            Add
                        </Button>
                        <Divider />
                    {/* /???????? */}

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
                        
                        <br />

                        <Button className={classes.btnBuyNow} type="submit" disabled={!isValid}>
                            Buy Now
                        </Button>
                    </Form>                   
                )}
            </Formik>
            </div>
        </div>
    );
};
export default NewOrderForm;