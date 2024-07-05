import { React, useState } from 'react';
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

function SignIn() {

  const allowedDomains = ['vgecg.ac.in'];
  const [otp, setOtp] = useState('');
  const [otpValidationMessage, setOtpValidationMessage] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(null);
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(null);
  const [isEmailExist, setIsEmailExist] = useState(null);
  const [emailMessage, setEmailMessage] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/signin', { email })
    console.log("before set isLoggedin: ", isLoggedin);
    setIsLoggedin(true);
    navigate('/'); // Redirect to the root route
  };
  const handleEmailChange = async (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);

    if (validateEmail(emailInput)) {
      try {
        const response = await axios.post('http://localhost:5000/check-email', { email: emailInput, type: 'signin' });
        setIsEmailExist(response.data.exists);
        setEmailMessage(response.data.exists ? 'Email is valid.' : 'Email does not exist');
      } catch (error) {
        console.error('Error checking email:', error);
        setIsEmailExist(null);
        setEmailMessage('Error checking email');
      }
    } else {
      setIsEmailExist(null);
      setEmailMessage('Invalid email.');
    }
  };
  
  function validateEmail(email) {
    const [, domain] = email.split('@');
    return allowedDomains.includes(domain);
  }

  async function handleOtpSent() {
    
      try {
        axios.post('http://localhost:5000/send-otp', { email, type: 'signin' });
        setOtpMessage('OTP sent!');
        setIsOtpSent(true);
      } catch (error) {
        setMessage('Error sending OTP');
        setOtpMessage('Error sending OTP');
      }
    
  }


  const handleOtpValidation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={email && (isEmailExist === false)}
              helperText={email ? emailMessage : ''}
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
              disabled={!isEmailExist ||  isOtpSent}
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
              disabled= {!isOtpValid}
            >
              Sign In
            </Button>
            <Typography color="error">{message}</Typography>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
