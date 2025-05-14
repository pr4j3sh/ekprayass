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
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch } from "react-redux";
import { deleteBlog, getBlogs } from "../../features/blogs/blogSlice";
import DOMPurify from "dompurify";

const BlogCard = ({
  id,
  author,
  authorImg,
  createdAt,
  hide,
  img,
  title,
  desc,
  btnName,
  btnLink,
}) => {
  const dispatch = useDispatch();
  const sanitizedDesc = DOMPurify.sanitize(desc);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteBlog(id));
    await dispatch(getBlogs());
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
      <CardMedia component="img" height="194" image={img} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
          sx={{ textOverflow: "ellipsis" }}
        ></Typography> */}
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
            to={`/dashboard/blogs/update/${id}`}
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

export default BlogCard;
