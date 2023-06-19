import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

 const LoginComp = ()=> {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField id="email" label="email" variant="outlined" />
      <TextField id="password" label="password" variant="outlined" />
      <Button variant="contained" color="primary" disableElevation>
      Login
     </Button> */}
    </form>
  );
}

export default LoginComp;
