import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useAppContext } from "../../context/AppContext";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const [serverError, setServerError] = useState("");
  const { sendRequest } = useHttpRequest();
  const { dispatch, state } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const oneOfFieldsIsEmpty: boolean =
      !emailRef.current?.value.length || !passwordRef.current?.value.length;
    const hasError: boolean = emailError || passwordError;

    setDisable(hasError || oneOfFieldsIsEmpty);
  }, [emailError, passwordError]);

  useEffect(() => {
    if (state.loggedUser) {
      navigate("/");
    }
  }, [state.loggedUser]);

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
  //password validation
  const ratz = /[a-z]/,
    rAtZ = /[A-Z]/,
    r0t9 = /[0-9]/;
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

  const loginHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    setServerError("");
    const signinResult = await sendRequest("/api/users/signin", "POST", {
      username: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });
    if (!signinResult) {
      setServerError("Invalid user and password");
      return;
    }
    console.log('signin', signinResult);
    dispatch({
      type: "login",
      payload: signinResult.data,
    });
    navigate("/");
  };
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
            textAlign: "center",
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
            sx={{ width: "70%" }}
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
            sx={{ width: "70%" }}
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
              width: "70%",
            }}
          >
            Login
          </Button>
          {!!serverError && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {serverError}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
