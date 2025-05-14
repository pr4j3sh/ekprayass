import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../../components/Heading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Country, State, City } from "country-state-city";
import { updateUser } from "../../../features/user/userSlice";
import { FileInput, Form } from "../../../components/forms/CustomForm";

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    id: user?.id || null,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    state: user?.state || "",
    city: user?.city || "",
    countryCode: user?.countryCode || "",
    country: user?.country || "",
    age: user?.age || "",
    sex: user?.sex || "",
    occupation: user?.occupation || "",
    dob: user?.dob || "",
    avatar: user?.avatar || "",
    url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(formData));
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: "",
      lastName: "",
      phone: "",
      state: "",
      city: "",
      countryCode: "",
      country: "",
      age: "",
      sex: "",
      occupation: "",
      dob: "",
      avatar: "",
      url: "",
    }));
  };

  useEffect(() => {
    if (id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id,
      }));
    }
  }, [id]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading header={"Update Profile"} />

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
                to="/dashboard/profile"
                startIcon={<ArrowBackIcon />}
              >
                Go Back
              </Button>
            </Stack>
            <Typography>{user?.firstName}</Typography>
            <Typography>{user?.lastName}</Typography>
            <Typography>{user?.phone}</Typography>
            <Typography>{user?.country}</Typography>
            <Typography>{user?.state}</Typography>
            <Typography>{user?.city}</Typography>
            <Typography>{user?.role}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Avatar Preview
                </Typography>
                {formData?.url ? (
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
                  title={formData.firstName}
                />
              )}
            </Card>
            <Form encType="multipart/form-data" onSubmit={handleSubmit}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Avatar
                <FileInput
                  type="file"
                  name="avatar"
                  // value={formData.avatar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      avatar: e.target.files[0],
                      url: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </Button>
              <TextField
                label="First Name"
                variant="outlined"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <TextField
                label="Mobile No"
                variant="outlined"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                type="tel"
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  helperText="Please select your gender"
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  hiddenLabel
                  fullWidth
                  variant="outlined"
                  value={formData.dob}
                  type="date"
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  helperText="Please enter your date of birth"
                />
              </Stack>
              <TextField
                label="Occupation"
                variant="outlined"
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
              />
              <TextField
                select
                label="Country"
                variant="outlined"
                value={formData.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    country: e.target.value,
                  })
                }
              >
                {Country.getAllCountries().map((option) => (
                  <MenuItem key={option.isoCode} value={option.isoCode}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="State"
                variant="outlined"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              >
                {State.getStatesOfCountry(formData.country).map((option) => (
                  <MenuItem key={option.isoCode} value={option.isoCode}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="City"
                variant="outlined"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              >
                {City.getCitiesOfState(formData.country, formData.state).map(
                  (option) => (
                    <MenuItem key={option.isoCode} value={option.name}>
                      {option.name}
                    </MenuItem>
                  )
                )}
              </TextField>
              <Button type="submit" variant="contained">
                Post
              </Button>
            </Form>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default UpdateProfile;
