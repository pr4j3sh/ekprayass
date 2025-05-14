import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Link,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deletePoster, getPosters } from "../../features/posters/posterSlice";

const PosterCard = ({ id, img, title, hide, author, btnLink }) => {
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
    await dispatch(deletePoster(id));
    await dispatch(getPosters());
  };

  return (
    <ImageListItem>
      <img
        srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${img}?w=248&fit=crop&auto=format`}
        alt={title}
        loading="lazy"
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={1}
      >
        <Link
          component={RouterLink}
          to={btnLink}
          sx={{ textDecoration: "None", color: "inherit" }}
        >
          <ImageListItemBar position="below" title={title} />
        </Link>
        {!hide && (
          <IconButton onClick={handleMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
      </Stack>
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
            to={`/dashboard/posters/update/${id}`}
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
    </ImageListItem>
  );
};

export default PosterCard;
