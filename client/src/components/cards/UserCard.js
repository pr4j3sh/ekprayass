import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const UserCard = ({ img, role, name }) => {
  return (
    <Card sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Avatar alt={name} src={img} sx={{ width: 56, height: 56 }} />
            <Stack>
              <Typography component="div" variant="h6">
                {name}
              </Typography>
              <Stack display={"block"} pb={1}>
                <Chip label={role} />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserCard;
