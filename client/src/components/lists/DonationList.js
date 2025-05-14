import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const DonationList = ({ amount, date }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <CurrencyRupeeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={amount} secondary={date} />
    </ListItem>
  );
};

export default DonationList;
