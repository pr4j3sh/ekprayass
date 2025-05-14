import { Stack, Typography } from "@mui/material";
import React from "react";

const Header = ({ subTitle, title, desc }) => {
  return (
    <Stack spacing={4} alignItems={"center"}>
      <Stack spacing={2} alignItems={"center"}>
        <Typography variant="subtitle2" align={"center"}>
          {subTitle}
        </Typography>
        <Typography variant="h3" align={"center"}>
          {title}
        </Typography>
        <Typography variant="subtitle1" align={"center"}>
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Header;
