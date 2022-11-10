import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  //email validation
  const isEmailValid = ( email: string) => {
    
    if ((email.includes('@'))) {
      setEmailError(false);
      setEmailErrorMsg(`Excellent`)
    } else {
      setEmailError(true);
      setEmailErrorMsg('Please include @');
      return
    }
  }
  //password validation
  const ratz = /[a-z]/, rAtZ = /[A-Z]/, r0t9 = /[0-9]/;
  const isPasswordValid = (password: string) =>{

    //Create a new state to check if the button is available?
    if (!(ratz.test(password))) {
      setPasswordError(true)
      setPasswordErrorMsg('Please include at least one lowercase letter')
      return
    }else if (!(rAtZ.test(password))) {
      setPasswordError(true)
      setPasswordErrorMsg('Please include at least one uppercase letter')
      return
    }else if (!(r0t9.test(password))) {
      setPasswordError(true)
      setPasswordErrorMsg('Please include at least one number')
      return
    }else if(password.trim().length < 8){
      setPasswordError(true)
      setPasswordErrorMsg('Please put more than 8 characters');
      return
    }

    setPasswordError(false)
    setPasswordErrorMsg(`You are good to go!!`)

    if (!(emailError && passwordError)) {
      setDisable(false)
    }
  }

  const loginHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    e.preventDefault();
    console.log(`email: ${emailRef.current?.value}, password: ${passwordRef.current?.value}`)
  }
  return (
    <Grid container component="section" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          background: "#F9F6F0",
        }}
      ></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 20, mb:10 }}>
          <Typography component="h3" variant="h4">
            Login
          </Typography>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <Typography component="h3" variant="h4" color="#BFBFBF">
              Sign up
            </Typography>
          </Link>
        </Box>
        <Box
          component="form"
          onSubmit={loginHandler}
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
              justifyContent: "center",
            textAlign: "center"
          }}
        >
          <TextField
            inputRef={emailRef}
            onChange={(event) => isEmailValid(event.target.value)}
            error={emailError}
            helperText={emailErrorMsg}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
                      autoFocus
                      sx={{width:"70%"}}
          />
          <TextField
            inputRef={passwordRef}
            error={passwordError}
            helperText={passwordErrorMsg}
            onChange={(event) => isPasswordValid(event.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
                      autoComplete="current-password"
                      sx={{width:"70%"}}
          />
          <Button
            type="submit"
            disabled={disable}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              pt: 2,
              pb: 2,
              fontSize: 20,
                backgroundColor: "#2CA58D",
              width:"70%"
            }}
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
