import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { getUser } from "../../features/user/userSlice";
import AlertBox from "../../components/AlertBox";
import { Form } from "../../components/forms/CustomForm";
import Heading from "../../components/Heading";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, status, message } = useSelector((state) => state.auth);
  const { user, isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!status && message) {
      setOpen(true);
    }
  }, [status, message]);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Form onSubmit={handleSubmit}>
      <Heading header={"Login to you account"} />
      <TextField
        type="email"
        label="Email Id"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Stack direction={"row"} spacing={1}>
        <Link component={RouterLink} to="/auth/forgot">
          Forgot Password?
        </Link>
      </Stack>
      <Button variant="contained" type="submit">
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <>Login</>
        )}
      </Button>
      <Stack direction={"row"} spacing={1}>
        <Typography>Don't have an account?</Typography>
        <Link component={RouterLink} to="/auth/register">
          Register
        </Link>
      </Stack>
      <AlertBox
        open={open}
        handleClose={handleClose}
        type={"error"}
        message={message}
      />
    </Form>
  );
};

export default LoginPage;
