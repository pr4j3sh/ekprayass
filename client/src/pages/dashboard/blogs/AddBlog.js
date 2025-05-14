import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { createBlog, getBlogs } from "../../../features/blogs/blogSlice";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Heading from "../../../components/Heading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FileInput, Form } from "../../../components/forms/CustomForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    url: "",
    author: {
      id: null,
      name: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        description,
        author: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar,
        },
      }));
    }
  }, [user, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await dispatch(createBlog(formData));
    await dispatch(getBlogs());
    setFormData({
      title: "",
      image: "",
      url: "",
      author: {
        id: null,
        name: "",
        avatar: "",
      },
    });
    setDescription("");
    await navigate("/dashboard/blogs");
  };

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Add Blog"} />
      <Grid
        container
        // py={4}
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Stack spacing={2} display={"block"}>
              <Button
                component={RouterLink}
                to="/dashboard/blogs"
                startIcon={<ArrowBackIcon />}
              >
                Go Back
              </Button>
            </Stack>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Poster Preview
                </Typography>
                {formData.url ? (
                  <></>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Upload an image to see preview
                  </Typography>
                )}
              </CardContent>
              {formData.url && (
                <CardMedia
                  sx={{ height: 500 }}
                  image={formData.url}
                  title={formData.title}
                />
              )}
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <InputLabel>Provide an image file</InputLabel>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <FileInput
                type="file"
                name="image"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </Button>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              // style={{ height: "300px" }}
            />
            <Button variant="contained" type="submit">
              Post
            </Button>
          </Form>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddBlog;
