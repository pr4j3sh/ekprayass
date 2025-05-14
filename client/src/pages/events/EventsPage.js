import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Alert,
  Box,
  Grid,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import EventCard from "../../components/cards/EventCard";
import ActionCard from "../../components/cards/ActionCard";
import Heading from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../features/events/eventSlice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const EventsPage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { events, isLoading } = useSelector((state) => state.event);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const today = new Date();
    const ongoing = [];
    const past = [];
    const upcoming = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);

      if (eventDate.toDateString() === today.toDateString()) {
        ongoing.push(event);
      } else if (eventDate < today) {
        past.push(event);
      } else {
        upcoming.push(event);
      }
    });

    setOngoingEvents(ongoing);
    setPastEvents(past);
    setUpcomingEvents(upcoming);
  }, [events]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Mobilizing Marshals"}
        title={"Join Our Events"}
        desc={
          "Be an active member of the Tobacco Marshal community by participating in our events. Discover opportunities to host awareness events, workshops, and campaigns aimed at creating a healthier society. Together, we can make a difference."
        }
      />
      <Grid
        container
        // py={4}
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <ActionCard title={upcomingEvents?.length} desc={"upcoming events"} />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <ActionCard title={ongoingEvents?.length} desc={"ongoing events"} />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <ActionCard title={pastEvents?.length} desc={"past events"} />
        </Grid>
      </Grid>
      <Heading header={"Events"} isSearch={true} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Ongoing Events" />
            <Tab label="Upcoming Events" />
            <Tab label="Past Events" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Grid
              container
              // py={4}
              direction={{ xs: "column", md: "row" }}
              rowSpacing={{ xs: 4, md: 1 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {ongoingEvents.length > 0 ? (
                ongoingEvents.map((event) => (
                  <Grid item xs={2} sm={4} md={4} key={event._id}>
                    <EventCard
                      id={event._id}
                      author={event.author.name}
                      authorImg={`${process.env.REACT_APP_AVATAR_URL}${event?.author.avatar}`}
                      createdAt={event.createdAt}
                      hide={true}
                      img={`${process.env.REACT_APP_EVENT_URL}${event?.image}`}
                      title={event.title}
                      desc={event.description}
                      org={event.organization}
                      venue={event.venue}
                      mode={event.mode}
                      date={event.date}
                      time={event.time}
                      btnLink={`/events/${event._id}`}
                      btnName={"View More"}
                    />
                  </Grid>
                ))
              ) : (
                <Stack py={4}>
                  <Alert severity="warning">No ongoing events found</Alert>
                </Stack>
              )}
            </Grid>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Grid
              container
              // py={4}
              direction={{ xs: "column", md: "row" }}
              rowSpacing={{ xs: 4, md: 1 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <Grid item xs={2} sm={4} md={4} key={event._id}>
                    <EventCard
                      id={event._id}
                      author={event.author.name}
                      authorImg={`${process.env.REACT_APP_AVATAR_URL}${event?.author.avatar}`}
                      createdAt={event.createdAt}
                      hide={true}
                      img={`${process.env.REACT_APP_EVENT_URL}${event?.image}`}
                      title={event.title}
                      desc={event.description}
                      org={event.organization}
                      venue={event.venue}
                      mode={event.mode}
                      date={event.date}
                      time={event.time}
                      btnLink={`/events/${event._id}`}
                      btnName={"View More"}
                    />
                  </Grid>
                ))
              ) : (
                <Stack py={4}>
                  <Alert severity="warning">No upcoming events found</Alert>
                </Stack>
              )}
            </Grid>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Grid
              container
              // py={4}
              direction={{ xs: "column", md: "row" }}
              rowSpacing={{ xs: 4, md: 1 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <Grid item xs={2} sm={4} md={4} key={event._id}>
                    <EventCard
                      id={event._id}
                      author={event.author.name}
                      authorImg={`${process.env.REACT_APP_AVATAR_URL}${event?.author.avatar}`}
                      createdAt={event.createdAt}
                      hide={true}
                      img={`${process.env.REACT_APP_EVENT_URL}${event?.image}`}
                      title={event.title}
                      desc={event.description}
                      org={event.organization}
                      venue={event.venue}
                      mode={event.mode}
                      date={event.date}
                      time={event.time}
                      btnLink={`/events/${event._id}`}
                      btnName={"View More"}
                    />
                  </Grid>
                ))
              ) : (
                <Stack py={4}>
                  <Alert severity="warning">No past events found</Alert>
                </Stack>
              )}
            </Grid>
          )}
        </CustomTabPanel>
      </Box>
    </Stack>
  );
};

export default EventsPage;
