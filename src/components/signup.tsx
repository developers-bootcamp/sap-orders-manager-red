
import axios from "axios";
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import User from "../interface/user";

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Set up your account
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <Formik
            validationSchema={schema}
            initialValues={{ fullName: '', companyName: '', password: '', email: '', agree: false }}
            onSubmit={signUpFetch}
          >
            {({ isValid }) => (
              <Form>
                <Field type="text" name="fullName" placeholder="Enter your name" as={TextField} />
                <ErrorMessage name="fullName" component="div" />

                <Field type="text" name="companyName" placeholder="Enter company name" as={TextField} />
                <ErrorMessage name="companyName" component="div" />

                <Field type="email" name="email" placeholder="Enter email id / username" as={TextField} />
                <ErrorMessage name="email" component="div" />

                <Field name="password">
                  {({ field }: any) => (
                    <OutlinedInput
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
                      label="Password" placeholder="Enter password"
                    />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" />
                <Field name="agree">
                  {({ field }: any) => (
                    <FormControlLabel
                      {...field} type={showPassword ? 'text' : "password"}
                      control={<Checkbox />}
                      label="I agree to the Terms of Service and Privacy Policy"
                    />
                  )}
                </Field>
                <ErrorMessage name="agree" component="div" />

                <Button type="submit" disabled={!isValid} >
                  signUp
                </Button>
              </Form>
            )}
          </Formik>
          {error && <TextField value={error} InputProps={{ style: { color: "red" } }} />}

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpComp;
