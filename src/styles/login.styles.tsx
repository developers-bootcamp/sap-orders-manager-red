import React from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import SignUpComp from "../components/signup";
// import { logIn } from '../axios/userAxios';
// import { useNavigate } from 'react-router-dom';
// import { Alert } from '@mui/material';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//   }),
// );

// const LoginComp = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const navigate = useNavigate()

//   const [isShowError, setIsShowError] = useState(false)

//   const logInAndSetToken = () => {
//     if (email || password) {
//       logIn(email, password)
//         .then(res => {
//           window.localStorage.setItem("userToken", res.data)
//           setIsShowError(false)
//           navigate("/")
//         })
//         .catch(err => {
//           setIsShowError(true)
//         })
//     }
//   }

//   const classes = useStyles();
//   // const navigate = useNavigate();
//   return (
//     <form className={classes.root} noValidate autoComplete="off">
//       <TextField id="email" label="email" variant="outlined" onChange={e => setEmail(e.target.value)} />
//       <TextField id="password" label="password" variant="outlined" onChange={p => setPassword(p.target.value)} />
//       {isShowError && <Alert severity="error">You do not exist in the system! try to register...</Alert>}
//       <Button variant="contained" color="primary" disableElevation onClick={logInAndSetToken}>
//         Login
//       </Button>
//       {/* <Button variant="contained" color="primary" onClick={()=>{navigate("/signUp")}} disableElevation> */}
//       <SignUpComp></SignUpComp>
//     </form>
//   );
// }

// export default LoginComp;
