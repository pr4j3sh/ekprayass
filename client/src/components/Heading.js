import { Link as RouterLink } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchBar from "./SearchBar";

const Heading = ({ header, isSearch, btnName, btnLink, btnIcon }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={{ xs: "left", sm: "center" }}
      spacing={2}
      sx={{ borderLeft: "5px solid #2a7fec", paddingLeft: "0.5rem" }}
    >
      <Typography variant="h4">{header}</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "left", sm: "center" }}
        spacing={2}
      >
        {/* {isSearch && <SearchBar />} */}
        {btnName && (
          <Button
            component={RouterLink}
            to={btnLink}
            variant="outlined"
            endIcon={btnIcon ? btnIcon : <KeyboardArrowRightIcon />}
          >
            {btnName}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Heading;
