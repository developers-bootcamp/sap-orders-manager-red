import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox, DialogTitle, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import  useStyles  from './signUp.styles'

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
    console.log(values);
  };

  return (
    <div>
      <Link onClick={handleClickOpen} underline="hover" >
       Sign Up
      </Link>
      <Dialog  open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent className='dialog-sign-up'>
          <DialogTitle>Set up your account</DialogTitle>
          <Formik
            validationSchema={schema}
            initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
            onSubmit={handleSignUp}
          >
            {({ isValid }) => (
              <Form>
                <FormHelperText  >Full name</FormHelperText>
                <Field className={classes.txtField}type="text" name="fullName"  as={TextField}/>
                <ErrorMessage className={classes.msdError} name="fullName" component="div" />

                <FormHelperText>Company Name</FormHelperText>
                <Field className={classes.txtField} type="text" name="companyName"  as={TextField} />
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


                <Field name="agree">
                  {({ field }: any) => (
                     <FormControlLabel
                      {...field} type={showPassword ? 'text' : "password"}
                     control={<Checkbox />}
                      label="I agree to the Terms of Service and Privacy Policy" 
                    />
                  )}
                </Field>
                <ErrorMessage className={classes.msdError} name="agree" component="div" />
                <br/>
                <Button className={classes.btnSignUp} type="submit" disabled={!isValid}>
                  sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpComp;