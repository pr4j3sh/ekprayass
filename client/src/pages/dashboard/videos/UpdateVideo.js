import { Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  getVideo,
  getVideos,
  updateVideo,
} from "../../../features/videos/videoSlice";
import Heading from "../../../components/Heading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form } from "../../../components/forms/CustomForm";

const UpdateVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  const [formData, setFormData] = useState({
    id: null,
    title: video?.title || "",
    description: video?.description || "",
    url: video?.url || "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getVideo(id));
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id,
      }));
    }
  }, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateVideo(formData));
    await dispatch(getVideos());
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: "",
      description: "",
      url: "",
    }));
    await navigate("/dashboard/videos");
  };
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Update Video"} />
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

export default UpdateVideo;
