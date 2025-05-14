import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  getEvent,
  getEvents,
  updateEvent,
} from "../../../features/events/eventSlice";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Heading from "../../../components/Heading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FileInput, Form } from "../../../components/forms/CustomForm";

const mode = [
  {
    value: "online",
    label: "Online",
  },
  {
    value: "offline",
    label: "Offline",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
];

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.event);
  const [formData, setFormData] = useState({
    id: null,
    title: event?.title || "",
    description: event?.description || "",
    image: event?.image || "",
    date: event?.date || "",
    time: event?.time || "",
    organization: event?.organization || "",
    mode: event?.mode || "",
    venue: event?.venue || "",
    link: event?.link || "",
    url: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getEvent(id));
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id,
      }));
    }
  }, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateEvent(formData));
    await dispatch(getEvents());
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: "",
      description: "",
      image: "",
      date: "",
      time: "",
      organization: "",
      mode: "",
      venue: "",
      link: "",
      url: "",
    }));
    await navigate("/dashboard/events");
  };
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Update Event"} />
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
                to="/dashboard/events"
                startIcon={<ArrowBackIcon />}
              >
                Go Back
              </Button>
            </Stack>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Event Preview
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
            <TextField
              type="text"
              label="Organization"
              fullWidth
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                fullWidth
                label="Mode"
                helperText="Please select your gender"
                onChange={(e) =>
                  setFormData({ ...formData, mode: e.target.value })
                }
              >
                {mode.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                hiddenLabel
                fullWidth
                variant="outlined"
                value={formData.date}
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                helperText="Date of Event"
              />
              <TextField
                hiddenLabel
                fullWidth
                variant="outlined"
                value={formData.time}
                type="time"
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                helperText="Time of Event"
              />
            </Stack>
            <TextField
              type="text"
              label="Venue"
              fullWidth
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
            />
            <TextField
              type="text"
              label="Event Link"
              fullWidth
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
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

export default UpdateEvent;
