import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  createPoster,
  getPosters,
} from "../../../features/posters/posterSlice";
import { FileInput, Form } from "../../../components/forms/CustomForm";

const AddPoster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
    await dispatch(createPoster(formData));
    await dispatch(getPosters());
    console.log(formData);
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
    await navigate("/dashboard/posters");
  };

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Add Poster"} />
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

export default AddPoster;
