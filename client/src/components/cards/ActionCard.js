import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const ActionCard = ({ img, title, desc, type, price, btnName, btnLink }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      {img && <CardMedia sx={{ height: 240 }} image={img} title={title} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        {type && (
          <Stack display={"block"} pt={2}>
            <Chip label={type} />
          </Stack>
        )}
      </CardContent>
      {btnName && (
        <>
          <Divider />
          <CardActions>
            {price && (
              <Stack direction={"row"} spacing={1} sx={{ mr: "auto" }}>
                <CurrencyRupeeIcon />
                <Typography variant="">{price}</Typography>
              </Stack>
            )}
            <Button
              component={RouterLink}
              to={btnLink}
              size="small"
              endIcon={<KeyboardArrowRightIcon />}
            >
              {btnName}
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ActionCard;
