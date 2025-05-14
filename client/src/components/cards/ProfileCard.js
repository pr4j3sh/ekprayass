import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";

const ProfileCard = ({ avatar, role, name, email }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <CardMedia
        component="img"
        sx={{ width: { xs: "100%", sm: 151 } }}
        image={avatar}
        alt={name}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Chip label={role} />
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {email}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProfileCard;
