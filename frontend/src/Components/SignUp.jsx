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
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      const checkUsername = async () => {
        try {
          const response = await axios.post('http://localhost:5000/check-username', { username });
          setIsUsernameValid(response.data.isUnique);
        } catch (error) {
          setIsUsernameValid(false);
        }
      };
      checkUsername();
    } else {
      setIsUsernameValid(null);
    }
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      otp: data.get('otp'),
      username: data.get('username'),
    });
  };




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
            />
            {isUsernameValid !== null && (
              <Typography variant="body2" color={isUsernameValid ? 'success.main' : 'error.main'}>
                {isUsernameValid ? 'Username is available' : 'Username is already taken'}
              </Typography>
            )}
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
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={async() => {
                    console.log("Button clicked")
                    if (validateEmail(email)) {
                      try {
                        const response = await axios.post('http://localhost:5000/send-otp', { email });
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
            >
              Sign Up
            </Button>
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
