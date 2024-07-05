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
  const [isLogin, setIsLogin] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(null);




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

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        try {
          const response = await axios.post('http://localhost:5000/check-email', { email, type: 'signup' });
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
    const { passoutYear, college, department } = handleDetails(email);
    axios.post('http://localhost:5000/signup', { username, passoutYear, college, department})
    console.log("before set isLogin: ", isLogin);
    setIsLogin(true);
    navigate('/'); // Redirect to the root route
  };

  const handleDetails = (email) => {
    const [enrollNo, ] = email.split('@');
    
    if (enrollNo.length !== 12) {
      console.error('Invalid enrollment number length');
      return;
    }
  
    const admissionYear = enrollNo.slice(0, 2);
    const clgCode = enrollNo.slice(2, 5);
    const deptCode = enrollNo.slice(7, 9);

      const passoutYear = Number('20' +  admissionYear) + 4;
      let college;
      let department;

      switch (deptCode) {
        case '01':
          department = 'AERONAUTICAL ENGINEERING';
          break;
        case '02':
          department = 'AUTOMOBILE ENGINEERING';
          break;
        case '03':
          department = 'BIO-MEDICAL ENGINEERING';
          break;
        case '04':
          department = 'BIO-TECHNOLOGY';
          break;
        case '05':
          department = 'CHEMICAL ENGINEERING';
          break;
        case '06':
          department = 'CIVIL ENGINEERING';
          break;
        case '07':
          department = 'COMPUTER ENGINEERING';
          break;
        case '08':
          department = 'ELECTRICAL & ELECTRONICS ENGINEERING';
          break;
        case '09':
          department = 'ELECTRICAL ENGINEERING';
          break;
        case '10':
          department = 'ELECTRONICS ENGINEERING';
          break;
        case '11':
          department = 'ELECTRONICS & COMMUNICATION ENGINEERING';
          break;
        case '12':
          department = 'ELECTRONICS & TELECOMMUNICATION ENGINEERING';
          break;
        case '13':
          department = 'ENVIRONMENTAL ENGINEERING';
          break;
        case '14':
          department = 'FOOD PROCESSING TECHNOLOGY';
          break;
        case '15':
          department = 'INDUSTRIAL ENGINEERING';
          break;
        case '16':
          department = 'INFORMATION TECHNOLOGY';
          break;
        case '17':
          department = 'INSTRUMENTATION & CONTROL ENGINEERING';
          break;
        case '18':
          department = 'MARINE ENGINEERING';
          break;
        case '19':
          department = 'MECHANICAL ENGINEERING';
          break;
        case '20':
          department = 'MECHATRONICS ENGINEERING';
          break;
        case '21':
          department = 'METALLURGY ENGINEERING';
          break;
        case '22':
          department = 'MINING ENGINEERING';
          break;
        case '23':
          department = 'PLASTIC TECHNOLOGY';
          break;
        case '24':
          department = 'POWER ELECTRONICS';
          break;
        case '25':
          department = 'PRODUCTION ENGINEERING';
          break;
        case '26':
          department = 'RUBBER TECHNOLOGY';
          break;
        case '28':
          department = 'TEXTILE PROCESSING';
          break;
        case '29':
          department = 'TEXTILE TECHNOLOGY';
          break;
        case '31':
          department = 'COMPUTER SCIENCE & ENGINEERING';
          break;
        case '32':
          department = 'INFORMATION & COMMUNICATION TECHNOLOGY';
          break;
        case '34':
          department = 'MANUFACTURING ENGINEERING';
          break;
        case '35':
          department = 'ENVIRONMENTAL SCIENCE & TECHNOLOGY';
          break;
        case '36':
          department = 'CHEMICAL TECHNOLOGY';
          break;
        case '37':
          department = 'ENVIRONMENTAL SCIENCE AND ENGINEERING';
          break;
        case '39':
          department = 'NANO TECHNOLOGY';
          break;
        case '40':
          department = 'CIVIL & INFRASTRUCTURE ENGINEERING';
          break;
        case '41':
          department = 'ROBOTICS AND AUTOMATION';
          break;
        case '42':
          department = 'COMPUTER SCIENCE & ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)';
          break;
        case '43':
          department = 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE';
          break;
        case '44':
          department = 'CHEMICAL ENGINEERING (GREEN TECHNOLOGY & SUSTAINABILITY ENGINEERING)';
          break;
        case '45':
          department = 'COMPUTER SCIENCE & ENGINEERING (INTERNET OF THINGS AND CYBER SECURITY INCLUDING BLOCK CHAIN TECHNOLOGY)';
          break;
        case '46':
          department = 'COMPUTER SCIENCE & ENGINEERING (DATA SCIENCE)';
          break;
        case '47':
          department = 'ELECTRONICS & INSTRUMENTATION ENGINEERING';
          break;
        case '48':
          department = 'COMPUTER SCIENCE & ENGINEERING (CYBER SECURITY)';
          break;
        case '49':
          department = 'COMPUTER SCIENCE & DESIGN';
          break;
        case '50':
          department = 'SMART & SUSTAINABLE ENERGY';
          break;
        case '51':
          department = 'FOOD ENGINEERING & TECHNOLOGY';
          break;
        case '52':
          department = 'ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING';
          break;
        case '53':
          department = 'PLASTICS ENGINEERING';
          break;
        case '54':
          department = 'ELECTRONICS AND COMMUNICATION (COMMUNICATION SYSTEM ENGINEERING)';
          break;
        case '89':
          department = 'MECHANICAL ENGINEERING';
          break;
        default:
          department = 'Unknown';
          break;
      }

      switch (clgCode) {
        case '001':
          college = 'A. D. PATEL INSTITUTE OF TECHNOLOGY, KARAMSAD';
          break;
        case '002':
          college = 'AHMEDABAD INSTITUTE OF TECHNOLOGY, GOTA, AHMEDABAD';
          break;
        case '003':
          college = 'ATMIYA INSTITUTE OF TECHNOLOGY & SCIENCE, RAJKOT';
          break;
        case '004':
          college = 'B. H. GARDI COLLEGE OF ENGINEERING & TECHNOLOGY, RAJKOT';
          break;
        case '005':
          college = 'BABARIA INSTITUTE OF TECHNOLOGY, VARNAMA';
          break;
        case '006':
          college = 'BHAGWAN MAHAVIR COLLEGE OF ENGINEERING & TECHNOLOGY, SURAT';
          break;
        case '007':
          college = 'BIRLA VISHVAKARMA MAHAVIDYALAYA, VALLABH VIDYANAGAR';
          break;
        case '008':
          college = 'BIRLA VISHVAKARMA MAHAVIDYALAYA, VALLABH VIDYANAGAR';
          break;
        case '009':
          college = 'C.K.PITHAWALA COLLEGE OF ENGG & TECHNOLOGY, SURAT';
          break;
        case '010':
          college = 'CHAROTAR INSTITUTE OF TECHNOLOGY, CHANGA';
          break;
        case '011':
          college = 'G. H. PATEL COLLEGE OF ENGINEERING & TECHNOLOGY, V V NAGAR';
          break;
        case '012':
          college = 'GANDHINAGAR INSTITUTE OF TECHNOLOGY, GANDHINAGAR';
          break;
        case '013':
          college = 'GOVERNMENT ENGINEERING COLLEGE, SECTOR - 28, GANDHINAGAR';
          break;
        case '014':
          college = 'GOVERNMENT ENGINEERING COLLEGE, BHARUCH';
          break;
        case '015':
          college = 'GOVERNMENT ENGINEERING COLLEGE, BHUJ';
          break;
        case '016':
          college = 'GOVERNMENT ENGINEERING COLLEGE, MODASA';
          break;
        case '017':
          college = 'VISHWAKARMA GOVERNMENT ENGINEERING COLLEGE, CHANDKHEDA';
          break;
        case '018':
          college = 'GOVERNMENT ENGINEERING COLLEGE, DAHOD';
          break;
        case '019':
          college = 'GOVERNMENT ENGINEERING COLLEGE, VALSAD';
          break;
        case '020':
          college = 'GOVERNMENT ENGINEERING COLLEGE, RAJKOT';
          break;
        case '021':
          college = 'GOVERNMENT ENGINEERING COLLEGE, BHAVNAGAR';
          break;
        case '022':
          college = 'GOVERNMENT ENGINEERING COLLEGE,AT. KATPUR, PATAN';
          break;
        case '023':
          college = 'DR.S.& S.S.GHANDHY GOVERNMENT ENGINEERING COLLEGE';
          break;
        case '024':
          college = 'HASMUKH GOSWAMI COLLEGE OF ENGINEERING, VAHELAL';
          break;
        case '025':
          college = 'INDUS INSTITUTE OF TECHNOLOGY & ENGINEERING, AHMEDABAD';
          break;
        case '026':
          college = 'KALOL INSTITUTE OF TECHNOLOGY & RESEARCH CENTRE, KALOL';
          break;
        case '027':
          college = 'KANKESHWARIDEVI INSTITUTE OF TECHNOLOGY, JAMNAGAR';
          break;
        case '028':
          college = 'L. D. COLLEGE OF ENGINEERING, AHMEDABAD';
          break;
        case '029':
          college = 'LALJIBHAI CHATURBHAI INSTITUTE OF TECHNOLOGY, BHANDU';
          break;
        case '030':
          college = 'LEELABEN DASHRATHBHAI RAMDAS PATEL INSTITUTE OF TECHNOLOGY & RESEARCH, GANDHINAGAR';
          break;
        case '031':
          college = 'LUKHDHIRJI ENGINEERING COLLEGE, MORBI';
          break;
        case '032':
          college = 'L. J. INSTITUTE OF ENGINEERING AND TECHNOLOGY, AHMEDABAD';
          break;
        case '033':
          college = 'MAHATMA GANDHI INSTITUTE OF TECHNICAL EDUCATION & RESEARCH CENTRE, NAVSARI';
          break;
        case '034':
          college = 'NARNARAYAN SHASTRI INSTITUTE OF TECHNOLOGY, JETALPUR';
          break;
        case '035':
          college = 'NOBLE GROUP OF INSTITUTIONS, JUNAGADH';
          break;
        case '036':
          college = 'SANJAYBHAI RAJGURU COLLEGE OF ENGINEERING';
          break;
        case '037':
          college = 'PARUL INSTITUTE OF ENGINEERING & TECHNOLOGY, WAGHODIA';
          break;
        case '038':
          college = 'R. K. COLLEGE OF ENGINEERING AND TECHNOLOGY, RAJKOT';
          break;
        case '039':
          college = 'S. P. B. PATEL ENGINEERING COLLEGE, MEHSANA';
          break;
        case '040':
          college = 'SANKALCHAND PATEL COLLEGE OF ENGINEERING, VISNAGAR';
          break;
        case '041':
          college = 'SARDAR VALLABHBHAI PATEL INSTITUTE OF TECHNOLOGY, VASAD';
          break;
        case '042':
          college = 'SARVAJANIK COLLEGE OF ENGINEERING & TECHNOLOGY, SURAT';
          break;
        case '043':
          college = 'SHANTILAL SHAH ENGINEERING COLLEGE, BHAVNAGAR';
          break;
        case '044':
          college = 'C. U. SHAH COLLEGE OF ENGINEERING & TECHNOLOGY, WADHWAN';
          break;
        case '045':
          college = 'SHRI S\'AD VIDYA MANDAL INSTITUTE OF TECHNOLOGY,BHARUCH';
          break;
        case '046':
          college = 'UNIVERSAL COLLEGE OF ENGINEERING & TECHNOLOGY, AHMEDABAD';
          break;
        case '047':
          college = 'VYAVASAYI VIDYA PRATISHTHAN\'S SANCH. COLLEGE OF ENGINEERING, RAJKOT';
          break;
        case '048':
          college = 'VALIA INSTITUTE OF TECHNOLOGY,VALIA, BHARUCH';
          break;
        case '049':
          college = 'SHRI SITARAMBHAI NARANJI PATEL INSTITUTE OF TECHNOLOGY,MANAGED BY VIDYABHARTI TRUST,UMRAKH -BARDOLI';
          break;
        case '050':
          college = 'SIGMA INSTITUTE OF ENGINEERING, VADODARA';
          break;
        default:
          college = 'Unknown';
          break;
      }

  
    return { passoutYear, college, department };
  };

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
        const response = await axios.post('http://localhost:5000/check-email', { email, type: 'signup' });
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
        axios.post('http://localhost:5000/send-otp', { username, email, type: 'signup' });
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
