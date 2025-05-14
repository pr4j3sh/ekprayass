import React, { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Heading from "../components/Heading";
import ActionCard from "../components/cards/ActionCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ClubLogo from "../assets/images/club-logo.png";
import ICanCareLogo from "../assets/images/icancare-logo.jpg";
import KietLogo from "../assets/images/kiet-logo.png";
import SideImage from "../assets/images/side.png";
import InspectImage from "../assets/images/inspect.png";
import SensitizeImage from "../assets/images/sensitize.png";
import CounselImage from "../assets/images/counsel.png";
import FreeImage from "../assets/images/free.png";
import MemberImage from "../assets/images/member.png";
import MarshalImage from "../assets/images/marshal.png";
import TogetherImage from "../assets/images/together.png";
import { useSelector } from "react-redux";

const HomePage = () => {
  const ref = useRef(null);
  const { user } = useSelector((state) => state.user);

  const scrollToExplore = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack direction={"column"} spacing={6}>
      <Grid
        container
        // py={4}
        direction={{ xs: "column-reverse", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="subtitle2">
                SmokeFreeLife. ClearLungs. TobaccoFreeZone.
              </Typography>
              <Typography variant="h3">
                Why not create a tobacco-free society and promote healthy
                living?
              </Typography>
              <Typography variant="subtitle1">
                We are dedicated to spreading awareness about the harmful
                effects of tobacco use and encouraging individuals to make
                healthy lifestyle choices. Join us in the fight against tobacco
                and let's work together to create a healthier and happier world.
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              {!user && (
                <Button
                  component={RouterLink}
                  to="/auth/register"
                  endIcon={<EastIcon />}
                  variant="contained"
                >
                  Join Us
                </Button>
              )}
              <Button
                endIcon={<KeyboardArrowRightIcon />}
                variant="outlined"
                onClick={scrollToExplore}
              >
                Explore More
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: { xs: "none", sm: "block" } }}>
          <CardMedia
            sx={{ height: 524, display: { xs: "none", sm: "block" } }}
            image={SideImage}
          />
        </Grid>
      </Grid>
      <Heading
        header={"What we do?"}
        btnName={"Know More"}
        btnLink={"/know/about"}
      />
      <Stack ref={ref}>
        <Grid
          container
          // alignItems="stretch"
          // py={4}
          direction={{ xs: "column", md: "row" }}
          rowSpacing={{ xs: 4, md: 1 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <ActionCard
              img={InspectImage}
              title={"Inspection"}
              desc={
                "Audience research is conducted to gather insights on the behavior and preferences of tobacco consumers. This involves conducting surveys or focus groups to gather feedback on tobacco products, advertising and marketing campaigns, and factors that influence tobacco use. Such research can help to promote tobacco cessation and prevent initiation of tobacco use."
              }
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <ActionCard
              img={SensitizeImage}
              title={"Sensitizing"}
              desc={
                "Sensitizing youth about the harmful effects of tobacco is critical in preventing tobacco use and promoting a healthy lifestyle. Youth are particularly vulnerable to tobacco addiction, as their brains are still developing and are more susceptible to the addictive effects of nicotine. Through education and awareness programs, youth can learn about the negative health effects of tobacco, including lung cancer, heart disease, and other respiratory illnesses."
              }
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <ActionCard
              img={CounselImage}
              title={"Counselling"}
              desc={
                "Counselling can provide individuals with the support and resources they need to successfully quit smoking and overcome their addiction. We work with the individual to identify the triggers and habits that lead to tobacco use, develop coping strategies for managing cravings and withdrawal symptoms, and provide ongoing support and encouragement throughout the quitting process. Additionally, counselling can help individuals address underlying issues that may be contributing to their addiction, such as stress, anxiety, or depression."
              }
            />
          </Grid>
        </Grid>
      </Stack>
      <Heading
        header={"Learn from us"}
        btnName={"Know More"}
        btnLink={"/blogs"}
      />
      <Stack>
        <Grid
          container
          // py={4}
          direction={{ xs: "column", md: "row" }}
          rowSpacing={{ xs: 4, md: 1 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <ActionCard
              img={FreeImage}
              title={"Free Content"}
              desc={
                "We have educational videos, blogs and articles, posters depicting a message for all audience."
              }
              btnName={"Explore content"}
              btnLink={"/blogs"}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <ActionCard
              img={MemberImage}
              title={"Members Only"}
              desc={
                "We also have special content to be accessed by only members of this website. So, what are you waiting for?"
              }
              btnName={user ? "Browse events" : "Become a member"}
              btnLink={user ? "/events" : "/auth/register"}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <ActionCard
              img={MarshalImage}
              title={"Become a Marshal"}
              desc={
                "Join the movement by becoming a Marshal and contribute in making this world tobacco free."
              }
              btnName={"Coming soon"}
              btnLink={"/courses"}
            />
          </Grid>
        </Grid>
      </Stack>
      <Grid
        container
        // py={4}
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
      >
        <Grid item xs={6} sx={{ display: { xs: "none", sm: "block" } }}>
          <CardMedia
            sx={{ height: 524, display: { xs: "none", sm: "block" } }}
            image={TogetherImage}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="h3">
                Together we can, together we will
              </Typography>
              {/* <Typography variant="subtitle1">
                Join us in making this world tobacco free.
              </Typography> */}
            </Stack>
            {/* <Stack direction={"row"} spacing={2}>
              <Button
                component={RouterLink}
                to="/donate"
                endIcon={<VolunteerActivismIcon />}
                variant="contained"
              >
                Donate
              </Button>
            </Stack> */}
          </Stack>
        </Grid>
      </Grid>
      <Stack>
        <Grid
          container
          py={2}
          direction={{ xs: "column", md: "row" }}
          rowSpacing={{ xs: 4, md: 4 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={2}>
              <img src={ClubLogo} alt="brand" height={"40px"} />
              <img src={KietLogo} alt="brand" height={"40px"} />
              <img src={ICanCareLogo} alt="brand" height={"40px"} />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              <IconButton href="mailto:ekprayss@kiet.edu">
                <EmailIcon />
              </IconButton>
              <IconButton href="https://www.instagram.com/club_ekprayass/">
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.facebook.com/club.ekprayass">
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://www.youtube.com/playlist?list=PLDRGddUJfTCBknqgYRVdnxO8iNwjwrHXG">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Link component={RouterLink} to="/events">
                Events
              </Link>
              <Link component={RouterLink} to="/marshals">
                Marshals
              </Link>
              <Link component={RouterLink} to="/courses">
                Courses
              </Link>
              <Link component={RouterLink} to="/blogs">
                Blogs
              </Link>
              <Link component={RouterLink} to="/videos">
                Videos
              </Link>
              <Link component={RouterLink} to="/posters">
                Posters
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Link component={RouterLink} to="/know/about">
                About Us
              </Link>
              <Link component={RouterLink} to="/know/contact">
                Contact Us
              </Link>
              {/* <Link component={RouterLink} to="">
                Donate
              </Link> */}
              <Link href="https://www.icancare.in/">icancare.in</Link>
              <Link href="https://www.kiet.edu/">kiet.edu</Link>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems={"center"}
        spacing={2}
      >
        <Typography variant="" color="text.secondary">
          &copy; 2023 | Ek Prayass - Jagrookta Ki Orr
        </Typography>
        <Typography variant="" color="text.secondary">
          Made with ❤ by Team Ek Prayass
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HomePage;
