import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvent } from "../../../features/events/eventSlice";
import {
  Button,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const DashViewEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    if (id) {
      dispatch(getEvent(id));
    }
  }, [id, dispatch]);
  return (
    <Stack spacing={2}>
      {isLoading ? (
        <Skeleton animation={"wave"} />
      ) : (
        <>
          <CardMedia
            sx={{ height: 500 }}
            image={`${process.env.REACT_APP_EVENT_URL}${event?.image}`}
          />
          <Typography gutterBottom variant="h5" component="div">
            {event?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event?.description}
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary={event?.organization} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={event?.venue} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ModeStandbyIcon />
                </ListItemIcon>
                <ListItemText primary={event?.mode} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary={event?.date} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccessTimeFilledIcon />
                </ListItemIcon>
                <ListItemText primary={event?.time} />
              </ListItemButton>
            </ListItem>
          </List>
          <Stack display={"block"}>
            <Button
              href={event?.link}
              disabled={event?.link ? false : true}
              variant="contained"
            >
              Join Now
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default DashViewEvent;
