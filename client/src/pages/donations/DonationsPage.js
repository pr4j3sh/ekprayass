import { Grid, Stack } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import ActionCard from "../../components/cards/ActionCard";

const DonationsPage = () => {
  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Support Our Mission"}
        title={"Make a Difference with Your Contribution"}
        desc={
          "Your generosity can help us in our mission to eradicate the tobacco epidemic and promote healthy living. Contribute to our cause today and be a part of creating a tobacco-free society. Every donation counts, and together, we can build a healthier and happier world for all."
        }
      />
      <Heading header={"Invest in a Tobacco-Free Future"} />
      <Grid
        container
        // py={4}
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <ActionCard
            title={"Tobacco Marshal"}
            desc={"upcoming events"}
            price={"5"}
            type={"Basic"}
            btnName={"Donate"}
            btnLink={""}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <ActionCard
            title={"Tobacco Marshal"}
            desc={"upcoming events"}
            price={"5"}
            type={"Basic"}
            btnName={"Donate"}
            btnLink={""}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <ActionCard
            title={"Tobacco Marshal"}
            desc={"upcoming events"}
            price={"5"}
            type={"Basic"}
            btnName={"Donate"}
            btnLink={""}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DonationsPage;
