import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const SignUp: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    const hasError: boolean = (usernameError || emailError) || passwordError;
    const isFormEmpty = (!usernameRef.current?.value.length || !emailRef.current?.value.length) || !passwordRef.current?.value.length;

    setDisable(hasError || isFormEmpty);
  }, [emailError, passwordError, usernameError])

  //Username validation
  const isUsernameValid = (username: string) =>{
    if (username.trim().length < 6) {
      setUsernameError(true);
      setUsernameErrorMsg('Please enter at least 6 characters');
      return;
    } else {
      setUsernameError(false);
      setUsernameErrorMsg('I love your name')
    }
  }

  const ratz = /[a-z]/,
    rAtZ = /[A-Z]/,
    r0t9 = /[0-9]/;
  
   //email validation
   const isEmailValid = (email: string) => {
    if (email.includes("@")) {
      setEmailError(false);
      setEmailErrorMsg(`Excellent`);
    } else {
      setEmailError(true);
      setEmailErrorMsg("Please include @");
      return;
    }
   };
  
   const isPasswordValid = (password: string) => {
    if (!ratz.test(password)) {
      setPasswordError(true);
      setPasswordErrorMsg("Please include at least one lowercase letter");
      return;
    } else if (!rAtZ.test(password)) {
      setPasswordError(true);
      setPasswordErrorMsg("Please include at least one uppercase letter");
      return;
    } else if (!r0t9.test(password)) {
      setPasswordError(true);
      setPasswordErrorMsg("Please include at least one number");
      return;
    } else if (password.trim().length < 8) {
      setPasswordError(true);
      setPasswordErrorMsg("Please put more than 8 characters");
      return;
    }

    setPasswordError(false);
    setPasswordErrorMsg(`You are good to go!!`);
   };
  
  const signUpHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(
      `username: ${usernameRef.current?.value}  email: ${emailRef.current?.value}, password: ${passwordRef.current?.value}`
    );
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: 20,
            mb: 10,
          }}
        >
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Typography component="h3" variant="h4" color="#BFBFBF">
              Login
            </Typography>
          </Link>
          <Typography component="h3" variant="h4">
            Sign up
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={signUpHandler}
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <TextField
            inputRef={usernameRef}
            onChange={(event) => isUsernameValid(event.target.value)}
            error={usernameError}
            helperText={usernameErrorMsg}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            sx={{ width: "70%" }}
          />
          <TextField
            inputRef={emailRef}
            onChange={(event) => isEmailValid(event.target.value)}
            error={emailError}
            helperText={emailErrorMsg}
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            sx={{ width: "70%" }}
          />
          <TextField
            inputRef={passwordRef}
            onChange={(event) => isPasswordValid(event.target.value)}
            error={passwordError}
            helperText={passwordErrorMsg}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ width: "70%" }}
          />
          <ImageUpload />
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
              width: "70%",
            }}
          >
            Sign up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
