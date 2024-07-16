import { React, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import {fetchDetails} from '../utils/fetchDetails';
import { useAuth } from '../AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

function SignUp() {

  const allowedDomains = ['vgecg.ac.in'];
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [otpValidationMessage, setOtpValidationMessage] = useState('');
  const navigate = useNavigate();
  const [isEmailUnique, setIsEmailUnique] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isOtpValid, setIsOtpValid] = useState(null);
  // const [isLoggedin, setIsLoggedin] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(null);
  const { login } = useAuth();




  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        try {
          const response = await axios.post(`${API_URL}/check-username`, { username });
          setIsUsernameValid(response.data.isUnique);
        } catch (error) {
          console.error('Error checking username:', error);
        }
      } else {
        setIsUsernameValid(null);
      }
    };

    checkUsername();
  }, [username]);

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        try {
          const response = await axios.post(`${API_URL}/check-email`, { email, type: 'signup' });
          setIsEmailValid(response.data.isUnique);
        } catch (error) {
          console.error('Error checking username:', error);
        }
      } else {
        setIsEmailValid(null);
      }
    };

    checkEmail();
  }, [email]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { passoutYear, college, department } = fetchDetails(email);
    try {
      const response = await axios.post(`${API_URL}/signup`, { username, passoutYear, college, department})
      if (response.status === 200) {
        login(response);
        navigate('/'); // Redirect to the root route
      } else {
        // Signup failed
        alert("Sign up failed. Please try again.");
      }
    } catch(error) {
      console.error("Error during sign up:", error);
      alert("An error occurred during sign up. Please try again.");
    }
  };

  

  const handleOtpValidation = async () => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
      if (response.data.isValid) {
        setOtpValidationMessage("OTP verified Successfully!!");
        setIsOtpValid(true);
      } else {
        setOtpValidationMessage("Invalid OTP!!");
        setIsOtpValid(false);
      }
    } catch (error) {
      console.error('Invalid OTP: ', error);
      setOtpValidationMessage('Invalid OTP!!');
    }
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);

    if (!email) {
      setIsEmailValid(null);
      setIsEmailUnique(null);
      return;
    }

    const emailValid = validateEmail(email);
    setIsEmailValid(emailValid);

    if (emailValid) {
      try {
        const response = await axios.post(`${API_URL}/check-email`, { email, type: 'signup' });
        setIsEmailUnique(response.data.isUnique);
      } catch (error) {
        console.error('Error checking email:', error);
      }
    } else {
      setIsEmailUnique(null); // Reset email uniqueness check if the email is invalid
    }
  };

  function handleOtpSent() {
    if (validateEmail(email)) {
      try {
        axios.post(`${API_URL}/send-otp`, { username, email, type: 'signup' });
        setOtpMessage('OTP sent!');
        setIsOtpSent(true);
      } catch (error) {
        setMessage('Error sending OTP');
        setOtpMessage('Error sending OTP');
      }
    } else {
      setOtpMessage('Invalid email domain');
    }
  }


  // Validate email domain
  function validateEmail(email) {
    const [, domain] = email.split('@');
    return allowedDomains.includes(domain);
  }

  return (
    <ThemeProvider theme={createTheme()}>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Your Anonymous username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={isUsernameValid === false}
              helperText={isUsernameValid === false ? 'Username is already taken' : isUsernameValid === true ? 'Username is available' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={email && (isEmailValid === false || isEmailUnique === false)}
              helperText={
                !email
                  ? ''
                  : !validateEmail(email)
                    ? 'Invalid email address'
                    : isEmailUnique === false
                      ? 'Email is already taken'
                      : isEmailUnique === true
                        ? 'Email is available'
                        : ''
              }
            />


            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP"
              type="text"
              id="otp"
              autoComplete="off"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isEmailUnique || !isEmailValid || !username || isUsernameValid === false || isOtpSent}
              onClick={handleOtpSent}
            >
              Send OTP
            </Button>

            {otpMessage && (
              <Typography variant="body2" color="primary" align="center" sx={{ mt: 2 }}>
                {otpMessage}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOtpValidation}
            >
              Validate OTP
            </Button>
            {otpValidationMessage && (
              <Typography variant="body2" color={otpValidationMessage.includes('valid') ? 'error' : 'primary'}>
                {otpValidationMessage}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isOtpValid}
            >
              Sign Up
            </Button>
           <Typography color="error">{message}</Typography>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;