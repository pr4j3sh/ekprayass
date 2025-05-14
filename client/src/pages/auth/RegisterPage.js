import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register } from "../../features/auth/authSlice";
import { getUser } from "../../features/user/userSlice";
import AlertBox from "../../components/AlertBox";
import { Form } from "../../components/forms/CustomForm";
import Heading from "../../components/Heading";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, status, message } = useSelector((state) => state.auth);
  const { user, isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      <Heading header={"Create account"} />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          type="text"
          label="First Name"
          fullWidth
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <TextField
          type="text"
          label="Last Name"
          fullWidth
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </Stack>
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
      <TextField
        type={showConfirmPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      <Button variant="contained" type="submit">
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <>Register</>
        )}
      </Button>
      <Stack direction={"row"} spacing={1}>
        <Typography>Already have an account?</Typography>
        <Link component={RouterLink} to="/auth/login">
          Login
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

export default RegisterPage;
