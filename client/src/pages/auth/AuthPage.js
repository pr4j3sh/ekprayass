import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClubLogo from "../../assets/images/club-logo.png";

const AuthPage = () => {
  return (
    <Container>
      <Stack height={{ xs: "auto", md: "100vh" }} justifyContent={"center"}>
        <Grid
          container
          py={4}
          direction={{ xs: "column", md: "row" }}
          rowSpacing={{ xs: 4, md: 1 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <Stack spacing={4}>
              <Stack spacing={2} display={"block"}>
                {/* <Typography variant="subtitle2">
              SmokeFreeLife. ClearLungs. TobaccoFreeZone.
            </Typography> */}
                <Button
                  component={RouterLink}
                  to="/"
                  startIcon={<ArrowBackIcon />}
                >
                  Go Home
                </Button>
                <Typography variant="h3">Join the Movement</Typography>
                <Typography variant="h6">
                  Become a part of the Tobacco Marshal community. Together, we
                  can make a healthier world a reality.
                </Typography>
                <Avatar src={ClubLogo} alt="" sx={{ width: 48, height: 48 }} />
              </Stack>
              <Stack direction={"row"} spacing={2}></Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Outlet />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default AuthPage;
