import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ClubLogo from "../../assets/images/club-logo.png";

const KnowPage = () => {
  return (
    <Stack direction={"column"} spacing={6}>
      <Stack alignItems={"center"}>
        <Avatar src={ClubLogo} alt="" sx={{ width: 150, height: 150 }} />
        <Stack alignItems={"center"}>
          <Typography variant="h3">Ek Prayass</Typography>
          <Typography variant="h4" color={"#2a7fec"}>
            Jagrookta Ki Orr
          </Typography>
        </Stack>
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default KnowPage;
