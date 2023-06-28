
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
    // fullName: Yup.string().required('Name is a required field').max(20, 'You cannot enter more than 20 letters'),
    // companyName: Yup.string().required('Company name is a required field').max(20, 'You cannot enter more than 20 letters'),
    // password: Yup.string()
    //     .required('Password is a required field')
    //     .min(8, 'Password must be at least 8 characters').max(20, 'You cannot enter more than 20 letters'),
    // email: Yup.string().required('Email is a required field').matches(/^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    //     , 'Invalid email format').max(200, 'You cannot enter more than 200 letters'),
    customer: Yup.string().required('customer is a required field'),
    product: Yup.string().required('customer is a required field'),
    // "Credit card number": Yup.string().required('cre is a required field')

    // agree: Yup.boolean().required("Required field").oneOf([true], "Required field")
});
const NewOrderForm: React.FC = () => {
    const classes = useStylesForOrders();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSignUp = (values: any) => {
        // Handle form submission or API call here
        console.log(values);
    };

    //*just for now!*\\
    const optionsForSelect=[ { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }];
    //*\\

    return (
        <>
           <div style={{ display: 'inline-block' }}>product list:<br></br>
                 collage       <br></br>
                 photo albom
            </div>

            <div style={{ display: 'inline-block' }}>
            <Formik
                validationSchema={schema}
                initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
                onSubmit={handleSignUp}
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
                            id="combo-box-demo"
                            options={optionsForSelect}
                            sx={{ width: 300 }}
                            renderInput={(params:any) => <TextField {...params} placeholder={optionsForSelect[0].label}/>}
                        />
                        <ErrorMessage className={classes.msdError} name="customeer" component="div" />
                        
                        <div style={{ }}>
                             <FormHelperText>product</FormHelperText>
                        <Field
                            component={Autocomplete}
                            disablePortal
                            id="combo-box-demo"
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

                        <FormHelperText>Expire on</FormHelperText>
                        <Field className={classes.spalltxtField} type="number" name="expireOn" as={TextField} />
                        {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}

                        <FormHelperText>Cvc</FormHelperText>
                        <Field className={classes.spalltxtField} type="number" name="Cvc" as={TextField} />
                        {/* <ErrorMessage className={classes.msdError} name="Credit card number" component="div" /> */}

                        <br />

                        <Button className={classes.btnBuyNow} type="submit" disabled={!isValid}>
                            Buy Now
                        </Button>
                    </Form>
                   
                )}
            </Formik>
            </div>
        </>
    );
};
export default NewOrderForm;