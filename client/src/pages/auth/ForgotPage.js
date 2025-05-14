import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../../components/forms/CustomForm";
import { resetPassword } from "../../features/auth/authSlice";

const ForgotPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await dispatch(resetPassword(formData));
    setFormData({
      email: "",
    });
    await navigate("/auth/reset");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading header={"Reset your Password"} />
      <TextField
        type="email"
        label="Email Id"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Button variant="contained" type="submit">
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <>Send Email</>
        )}
      </Button>
    </Form>
  );
};

export default ForgotPage;
