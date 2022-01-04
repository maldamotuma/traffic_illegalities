import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authactions';
import CustomizedSnackbars from '../components/CustomSnackbar'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/malda">
                TIC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const Login = ({login}) => {
    const [credentials, setCredentials] = React.useState({username: null, password: null});
    const [loading, setloading] = React.useState(false);
    const [authmess, setauthmess] = React.useState({snack: false, status: 'error'});


    const handleUsernameChange = (e) => {
        setCredentials({...credentials, username: e.target.value});
    }

    const handlePasswordChange = (e) => {
        setCredentials({...credentials, password: e.target.value});
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        login(credentials, setloading);
    }

    return (
        <ThemeProvider theme={theme}>
        <CustomizedSnackbars open={authmess} setOpen={setauthmess} message={"Invalid Credential"}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={credentials.username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            value={credentials.password}
                            onChange={handlePasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // onClick={handleFormSubmit}
                            loading={loading}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid
                        container
                        justifyContent="flex-end"
                        >

                            {/* <Link href="#" variant="body2"> */}
                            <ForgotPasswordComponent />
                            {/* </Link> */}

                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
