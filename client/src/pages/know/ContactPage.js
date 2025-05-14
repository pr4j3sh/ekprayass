import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Heading from "../../components/Heading";

const ContactPage = () => {
  return (
    <Grid
      container
      // py={4}
      direction={{ xs: "column", md: "row" }}
      rowSpacing={{ xs: 4, md: 1 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={6}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            {/* <Typography variant="subtitle2">
              SmokeFreeLife. ClearLungs. TobaccoFreeZone.
            </Typography> */}
            <Typography variant="h3">Do you like what we do?</Typography>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button
              href="https://www.instagram.com/club_ekprayass/"
              startIcon={<InstagramIcon />}
              variant="outlined"
            >
              /club_ekprayass
            </Button>
            <Button
              href="https://www.facebook.com/club.ekprayass"
              startIcon={<FacebookIcon />}
              variant="outlined"
            >
              /club.ekprayass
            </Button>
          </Stack>
          <Card>
            <CardContent>
              <Button
                href="https://maps.app.goo.gl/rtBef1bumBmT1Tmc7"
                startIcon={<LocationOnIcon />}
              >
                Visit Us
              </Button>
              <Typography variant="h6">KIET Group of Institutions</Typography>
              <Typography variant="h6">
                Phase - 1, Muradnagar Ghaziabad,
              </Typography>
              <Typography variant="h6">Uttar Pradesh - 201206</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Heading header={"Write to Us"} />
          <TextField
            type="text"
            label="
          Your Name"
          />
          <TextField type="email" label="Email Id" />
          <TextField type="text" multiline rows={4} label="Message" />
          <Button variant="contained">Send Message</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ContactPage;
