
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert, Autocomplete, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { MyMsdError, MyTxtField } from './SignUpForm.styles';
import { PALLETE } from '../../config/config';
import { getCurrencies } from '../../axios/currencyAxios'
import { signUp } from '../../axios/signUpAxios';

import { ICurrencyState } from "../../redux/slices/sliceCurrency";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from "../../redux/store";
import { setCurrencies } from "../../redux/slices/sliceCurrency";


const schema = Yup.object().shape({
    fullName: Yup.string().required('Name is a required field').max(20, 'You cannot enter more than 20 letters'),
    companyName: Yup.string().required('Company name is a required field').max(20, 'You cannot enter more than 20 letters'),
    password: Yup.string().required('Password is a required field').min(8, 'Password must be at least 8 characters').max(20, 'You cannot enter more than 20 letters'),
    email: Yup.string().required('Email is a required field').matches(/^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Invalid email format').max(200, 'You cannot enter more than 200 letters'),
    agree: Yup.boolean().required("Required field").oneOf([true], "Required field")
});

const SingUpForm: React.FC = () => {
    const dispatch = useAppDispatch();


    const listOfCurrencies: string[] = useSelector<RootState, ICurrencyState>(state => state.currencyReducer).listOfCurrencies;

    const [currency, setCurrency] = React.useState("DOLLAR");
    const [showPassword, setShowPassword] = React.useState(false);
    //const [listOfCurrencies, setListOfCurrencies] = React.useState([]);
    const [register, setRegistre] = React.useState(false);
    const [errorRegister, setErrorRegistre] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSignUp = (values: any) => {
        signUp(values.fullName, values.companyName, currency, values.email, values.password)
            .then(response => {
                setRegistre(true);
                setErrorRegistre(false);
            })
            .catch(error => {
                setErrorRegistre(true);

                if (error.code == 'ERR_BAD_REQUEST') {
                    setErrorMessage('email or company name already exists')
                }
                else {
                    setErrorMessage('the request could not be completed, please try again')
                }

            })
    };
    const getCurrenciesAsync = async () => {
        await getCurrencies().then(res => {
            // setListOfCurrencies(res.data);//PROBEBLY SHOULD BE REDUX
            dispatch(setCurrencies(res.data));
        }
        );

    }
    useEffect(() => {
        getCurrenciesAsync();
    }, []);
    return (
        <div>
            <Formik
                validationSchema={schema}
                initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
                onSubmit={handleSignUp}
            >
                {({ isValid }) => (
                    <Form >
                        <FormHelperText>Full name</FormHelperText>
                        <MyTxtField><Field fullWidth type="text" name="fullName" as={TextField} /></MyTxtField>
                        <MyMsdError><ErrorMessage name="fullName" component="div" /></MyMsdError>

                        <MyTxtField>
                            <Grid item container xs={12} sm={12}>
                                <Grid item xs={12} sm={9} sx={{ pr: 2 }}>
                                    <FormHelperText>Company Name</FormHelperText>
                                    <Field fullWidth type="text" name="companyName" as={TextField} />
                                    <MyMsdError><ErrorMessage name="companyName" component="div" /></MyMsdError>
                                </Grid>
                                <Grid item xs={12} sm={3}>
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
                            </Grid>
                        </MyTxtField>

                        <FormHelperText >Password</FormHelperText>
                        <Field name="password">
                            {({ field }: any) => (
                                <MyTxtField><OutlinedInput
                                    fullWidth
                                    {...field} type={showPassword ? 'text' : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                /></MyTxtField>
                            )}
                        </Field>
                        <MyMsdError><ErrorMessage name="password" component="div" /></MyMsdError>
                        <FormHelperText>Email address</FormHelperText>
                        <MyTxtField><Field fullWidth type="email" name="email" as={TextField} /></MyTxtField>
                        <MyMsdError><ErrorMessage name="email" component="div" /></MyMsdError>
                        <Field name="agree" >
                            {({ field }: any) => (
                                <FormControlLabel
                                    {...field} type={showPassword ? 'text' : "password"}
                                    control={<Checkbox />}
                                    label={`I agree to the  Terms of Service and Privacy Policy`}
                                />
                            )}
                        </Field>
                        <MyMsdError><ErrorMessage name="agree" component="div" /></MyMsdError>
                        <Button type="submit" disabled={!isValid} sx={{
                            mt: 2,
                            backgroundColor: `${PALLETE.YELLOW} !important`,
                            width: '30%',
                            color: `${PALLETE.WHITE}`,
                        }}>
                            sign Up
                        </Button>
                    </Form>
                )}
            </Formik>
            {errorRegister ? <Alert severity="error" sx={{ mt: 3 }}>
                {`Oops... ${errorMessage}`}
            </Alert> : ""}
            {register ? <Alert severity="success" sx={{ mt: 3 }}>
                You have successfully registered
            </Alert> : ""}
        </div>
    );
};
export default SingUpForm;