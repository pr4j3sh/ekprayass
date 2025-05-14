import { Alert, Stack } from "@mui/material";
import React from "react";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";

const DashOverview = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={`Welcome ${user?.firstName}`} />
      <Alert severity="warning">Nothing to show here</Alert>
    </Stack>
  );
};

export default DashOverview;
