import {React,useState, useEffect} from 'react';
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

function SignUp() {
  
  const allowedDomains = ['vgecg.ac.in'];
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [otpValidationMessage, setOtpValidationMessage] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        try {
          const response = await axios.post('http://localhost:5000/check-username', { username });
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUsernameValid) {
      try {
        console.log('Sending signup request with data:', { username, email, otp });
        const response = await axios.post('http://localhost:5000/signup', { username, email, otp });
        if (response.data.message === 'Signup successful') {
          navigate('/');
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setMessage('Error during signup');
      }
    } else {
      console.log('Username is not valid');
    }
  };

  const handleOtpValidation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      console.log('OTP validation response:', response.data);
      setOtpValidationMessage("OTP verified Successfully!!");
    } catch (error) {
      console.error('Error validating OTP:', error);
      setOtpValidationMessage('Error validating OTP');
    }
  };

  function handleRedirect() {
    
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
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={async() => {
                    console.log("Button clicked")
                    if (validateEmail(email)) {
                      try {
                        const response = await axios.post('http://localhost:5000/send-otp', { username, email});
                        setMessage(response.data.message);
                      } catch (error) {
                          setMessage('Error sending OTP');
                      }
                    } else {
                      console.log('Invalid email domain');
                    }
                  }}
            >
              Send OTP
            </Button>
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
              disabled={!isUsernameValid}
              onClick={handleRedirect}
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
