import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteEvent, getEvents } from "../../features/events/eventSlice";

const EventCard = ({
  id,
  author,
  authorImg,
  createdAt,
  hide,
  img,
  title,
  desc,
  org,
  venue,
  mode,
  date,
  time,
  btnName,
  btnLink,
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEvent(id));
    await dispatch(getEvents());
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar alt={author} src={authorImg} />}
        action={
          hide ? (
            <></>
          ) : (
            <IconButton onClick={handleMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={author}
        subheader={format(new Date(createdAt), "MMMM dd, yyyy")}
      />
      {/* <Divider /> */}
      <CardMedia component="img" height="194" image={img} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textOverflow: "ellipsis" }}
        >
          {desc}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText primary={org} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={venue} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeStandbyIcon />
              </ListItemIcon>
              <ListItemText primary={mode} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary={format(new Date(date), "MMMM dd, yyyy")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeFilledIcon />
              </ListItemIcon>
              <ListItemText
                primary={format(
                  new Date(`2000-01-01T${time}:00.000Z`),
                  "hh:mm a"
                )}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          component={RouterLink}
          to={btnLink}
          size="small"
          // variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          {btnName}
        </Button>
      </CardActions>
      <Menu
        id="know-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <Button
            sx={{ color: "#000", textDecoration: "none" }}
            component={RouterLink}
            to={`/dashboard/events/update/${id}`}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            startIcon={<DeleteIcon />}
            sx={{ color: "#000", textDecoration: "none" }}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default EventCard;
