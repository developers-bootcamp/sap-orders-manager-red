import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SignUpComp from "./signup";
import { useState } from 'react';
import { logIn } from '../axios/userAxios';
// import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const LoginComp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const logInAndSetToken = () => {
    debugger
    console.log("login", email, password)
    if (email || password) {
      logIn(email, password).then(res => {
        debugger
        window.localStorage.setItem("userToken", res.data)
      })
    }
  }

  const classes = useStyles();
  // const navigate = useNavigate();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="email" label="email" variant="outlined" onChange={e => setEmail(e.target.value)} />
      <TextField id="password" label="password" variant="outlined" onChange={p => setPassword(p.target.value)} />
      <Button variant="contained" color="primary" disableElevation onClick={logInAndSetToken}>
        Login
      </Button>
      <SignUpComp></SignUpComp>
      {/* <Button variant="contained" color="primary" onClick={()=>{navigate("/signUp")}} disableElevation>
       signUp
      </Button> */}
    </form>
  );
}

export default LoginComp;
