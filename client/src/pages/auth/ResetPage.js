import React, { useState } from "react";
import { Form } from "../../components/forms/CustomForm";
import Heading from "../../components/Heading";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmResetPassword } from "../../features/auth/authSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await dispatch(confirmResetPassword(formData));
    setFormData({
      token: "",
      newPassword: "",
    });
    await navigate("/auth/login");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading header={"Change Password"} />
      <TextField
        type="text"
        label="Token"
        value={formData.token}
        onChange={(e) => setFormData({ ...formData, token: e.target.value })}
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
        label="New Password"
        value={formData.newPassword}
        onChange={(e) =>
          setFormData({ ...formData, newPassword: e.target.value })
        }
      />
      <Button variant="contained" type="submit">
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <>Reset Password</>
        )}
      </Button>
    </Form>
  );
};

export default ResetPage;
