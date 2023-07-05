import React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox, DialogTitle, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import User from "../interface/user";
import useStyles from "./signUp.Styles";
import giftsImg from "../img/gifts.png"

// Creating schema
const schema = Yup.object().shape({
  fullName: Yup.string().required('Name is a required field'),
  companyName: Yup.string().required('Company name is a required field'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
  email: Yup.string().required('Email is a required field').email('Invalid email format'),
  agree: Yup.boolean().required("Required field").oneOf([true], "Required field")
});

const SignUpComp: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleSignUp = (values: any) => {
    // Handle form submission or API call here
    signUpFetch(values);
  };

  const navigate = useNavigate();

  const signUpFetch = async (values: any) => {
    // const formData = new FormData();
    // formData.append("fullName", values.fullName);
    // formData.append("companyName", values.companyName);
    // formData.append("email", values.email);
    // formData.append("password", values.password);

    const user: User = ({ fullName: values.fullName, password: values.password, email: values.email });

    console.log(values);

    axios.post("http://localhost:3600/api/signUp", { user }).then(res => {
      console.log(res);
      navigate("/");
    }
    ).catch(err => {
      console.log(err);
      setError(err.message);
    });
  };
  return (
  <div>
    <Link className={classes.openSignUp} onClick={handleClickOpen} underline="hover" >
      Sign Up
    </Link>
    <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent className={classes.dialogContent} >
        <div >
          <div className={classes.detailsDiv} style={{ display: 'inline-block' }}>
            <DialogTitle>Set up your account</DialogTitle>
            <Formik
              validationSchema={schema}
              initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
              onSubmit={handleSignUp}
            >
              {({ isValid }) => (
                <Form>
                  <FormHelperText>Full name</FormHelperText>
                  <Field className={classes.txtField} type="text" name="fullName" as={TextField} />
                  <ErrorMessage className={classes.msdError} name="fullName" component="div" />

                  <FormHelperText>Company Name</FormHelperText>
                  <Field className={classes.txtField} type="text" name="companyName" as={TextField} />
                  <ErrorMessage className={classes.msdError} name="companyName" component="div" />


                  <FormHelperText >Password</FormHelperText>
                  <Field name="password">
                    {({ field }: any) => (
                      <OutlinedInput className={classes.txtField}
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
                      />
                    )}
                  </Field>
                  <ErrorMessage className={classes.msdError} name="password" component="div" />

                  <FormHelperText>Email address</FormHelperText>
                  <Field className={classes.txtField} type="email" name="email" as={TextField} />
                  <ErrorMessage className={classes.msdError} name="email" component="div" />


                  <Field name="agree" >
                    {({ field }: any) => (
                      <FormControlLabel
                        {...field} type={showPassword ? 'text' : "password"}
                        control={<Checkbox />}
                        label={`I agree to the  Terms of Service and Privacy Policy`}

                      />
                    )}
                  </Field>
                  <ErrorMessage className={classes.msdError} name="agree" component="div" />
                  <br />
                  <Button className={classes.btnSignUp} type="submit" disabled={!isValid}>
                    sign Up
                  </Button>
                </Form>
              )}
            </Formik>
            {error && <TextField value={error} InputProps={{ style: { color: "red" } }} />}

          </div>
          <div className={classes.sideBackImg} style={{ display: 'inline-block' }}>
            <img className={classes.giftImg} src={giftsImg} alt='giftImg' />
            <div className={classes.txtSide}>
              Fill in your details so you can login later</div>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  </div>
   );

};

export default SignUpComp;