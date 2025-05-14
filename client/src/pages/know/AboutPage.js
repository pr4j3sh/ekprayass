import { Stack, Typography } from "@mui/material";
import React from "react";
import Heading from "../../components/Heading";

const AboutPage = () => {
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Our Vision"} />
      <Typography variant="h6">
        Our vision is to eradicate the tobacco epidemic from the society.
      </Typography>
      <Heading header={"Our Mission"} />
      <Typography variant="h6">
        Our mission is to put best foot forward with a holistic approach to
        empower the youth by spreading awareness and sensitizing them against
        the menace of tobacco abuse and reduce the morbidity rate.
      </Typography>
      <Heading header={"Roles & Responsibilities"} />

      <Typography variant="h6">
        Ensure appropriate NO SMOKING SIGNAGE are displayed and in charge of the
        various places take all necessary steps to comply with the law.
      </Typography>
      <Typography variant="h6">
        Visit to schools and colleges to spread awareness about the ill effect
        of tobacco use.
      </Typography>
      <Typography variant="h6">
        Social media platform will be used to sensitize the youth.
      </Typography>
      <Typography variant="h6">
        Creating awareness about first hand, second hand, third hand and
        fourth-hand smoke.
      </Typography>
      <Typography variant="h6">
        Motivate students to become volunteers of anti-drug activities in their
        life to make environment cleaner and greener.
      </Typography>
    </Stack>
  );
};

export default AboutPage;
