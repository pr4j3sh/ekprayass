import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { deleteVideo, getVideos } from "../../features/videos/videoSlice";

const VideoCard = ({
  id,
  author,
  authorImg,
  createdAt,
  hide,
  vid,
  title,
  desc,
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
    await dispatch(deleteVideo(id));
    await dispatch(getVideos());
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
      {/* <CardMedia component="img" height="194" image={img} alt={title} /> */}
      <ReactPlayer
        width={"100%"}
        // height={"100%"}
        url={vid}
        controls={true}
      />
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
            to={`/dashboard/videos/update/${id}`}
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

export default VideoCard;
