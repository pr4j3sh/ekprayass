import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  getBlog,
  getBlogs,
  updateBlog,
} from "../../../features/blogs/blogSlice";
import { FileInput, Form } from "../../../components/forms/CustomForm";
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
import ReactQuill from "react-quill";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Heading from "../../../components/Heading";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);
  const [description, setDescription] = useState(blog?.description || "");
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    image: blog?.image || "",
    url: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id,
        description,
      }));
    }
  }, [id, description, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateBlog(formData));
    await dispatch(getBlogs());
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: "",
      image: "",
      url: "",
    }));
    setDescription("");
    await navigate("/dashboard/blogs");
  };
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Update Blog"} />
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

export default UpdateBlog;
