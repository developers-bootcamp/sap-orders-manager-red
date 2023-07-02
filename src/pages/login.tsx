import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Divider, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { logIn } from '../axios/userAxios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GlobalModel from '../components/GlobalModal';
import SingUpForm from '../components/SignUpForm'
import { PALLETE } from '../config/config';
<<<<<<< Updated upstream



import giftsImg from "../img/gifts.png"

=======
import giftsImg from '../img/gifts.png'
>>>>>>> Stashed changes

const defaultTheme = createTheme();

export const LogIn: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleClickShowPassword = (): void => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate()

    const [isShowError, setIsShowError] = React.useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data: FormData = new FormData(event.currentTarget)
        const email: string = data.get('email')?.toString() || ""
        const password: string = data.get('password')?.toString() || ""
        if (email || password) {
            logIn(email, password)
                .then(res => {
                    window.localStorage.setItem("userToken", res.data)
                    setIsShowError(false)
                    navigate("/")
                })
                .catch(err => {
                    setIsShowError(true)
                })
        }
        else
            setIsShowError(true)
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        myapp
                    </Typography>
                </Toolbar>
            </AppBar>

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Log in to your acount
                        </Typography>

                        <Typography component="h2" variant="h5" sx={{ mt: 1 }}>
                            Enter your email address and password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, alignItems: 'center' }}>
                            <Container maxWidth="xs">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <OutlinedInput
                                    name="password"
                                    fullWidth
                                    required
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder='Password'
                                />
                                {isShowError && <Alert severity="error" sx={{ mt: 3 }}>
                                    Oops... try again or register
                                </Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2, backgroundColor: PALLETE.YELLOW }}
                                >
                                    Log in
                                </Button>
                            </Container>
                            <Divider> Or Sign in with </Divider>
                            <Box sx={{
                                marginTop: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <Button variant="outlined" sx={{textTransform: "none"}}>
                                    <svg aria-hidden="true" className="native svg-icon iconGoogle" width="23" height="23" viewBox="0 0 18 18">
                                        <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"></path>
                                        <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"></path>
                                        <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"></path>
                                        <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"></path>
                                    </svg>
                                    <Typography component="h6" variant="h6" sx={{ ml: 1 }}>
                                        Google
                                    </Typography>
                                </Button>
                                <Grid sx={{ mt: 3, display: 'flex' }}>
                                    <Typography sx={{ mr: 1 }}>
                                        Don't have an account yet?
                                    </Typography>

                                    <GlobalModel btnOpen={"Sign Up"} isButton={false} title={"Set up your account"} img={giftsImg}  txtSide={" Fill in your details so you can login later"}>
                                        <SingUpForm></SingUpForm>
                                    </GlobalModel>




                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </ThemeProvider >
    );
}