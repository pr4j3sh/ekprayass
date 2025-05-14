import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../../components/Heading";
import { Form } from "../../../components/forms/CustomForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createVideo, getVideos } from "../../../features/videos/videoSlice";

const AddVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
        author: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar,
        },
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await dispatch(createVideo(formData));
    await dispatch(getVideos());
    setFormData({
      title: "",
      description: "",
      url: "",
      author: {
        id: null,
        name: "",
        avatar: "",
      },
    });
    await navigate("/dashboard/videos");
  };

  return (
    <Stack>
      <Heading header={"Add Video"} />
      <Grid
        container
        // py={4}
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <Stack spacing={2} display={"block"}>
            <Button
              component={RouterLink}
              to="/dashboard/videos"
              startIcon={<ArrowBackIcon />}
            >
              Go Back
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              label="Youtube Link"
              variant="outlined"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
            <TextField
              label="Description"
              variant="outlined"
              value={formData.description}
              multiline
              rows={4}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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

export default AddVideo;
