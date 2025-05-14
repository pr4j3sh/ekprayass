import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPoster,
  getPosters,
  updatePoster,
} from "../../../features/posters/posterSlice";
import Heading from "../../../components/Heading";
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
import { Form, FileInput } from "../../../components/forms/CustomForm";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UpdatePoster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { poster } = useSelector((state) => state.poster);
  const [formData, setFormData] = useState({
    id: null,
    title: poster?.title || "",
    image: poster?.image || "",
    url: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getPoster(id));
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id,
      }));
    }
  }, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePoster(formData));
    await dispatch(getPosters());
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: "",
      image: "",
      url: "",
    }));
    await navigate("/dashboard/posters");
  };
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Upload Poster"} />
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
                to="/dashboard/posters"
                startIcon={<ArrowBackIcon />}
              >
                Go Back
              </Button>
            </Stack>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {poster?.title}
                </Typography>
              </CardContent>
              <CardMedia
                sx={{ height: 500 }}
                image={`${process.env.REACT_APP_POSTER_URL}${poster?.image}`}
                title={formData.title}
              />
            </Card>
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
              helperText="Please give your poster a title"
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
                // value={formData.file}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                    url: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </Button>
            <Button variant="contained" type="submit">
              Post
            </Button>
          </Form>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default UpdatePoster;
