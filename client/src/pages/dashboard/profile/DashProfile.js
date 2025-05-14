import { List, Stack } from "@mui/material";
import React from "react";
import Heading from "../../../components/Heading";
import EditIcon from "@mui/icons-material/Edit";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ProfileCard from "../../../components/cards/ProfileCard";
import DonationList from "../../../components/lists/DonationList";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Stack direction={"column"} spacing={6}>
      <Heading
        header={"My Profile"}
        btnName={"Edit Profile"}
        btnLink={"/dashboard/profile/update"}
        btnIcon={<EditIcon />}
      />
      <ProfileCard
        avatar={`${process.env.REACT_APP_AVATAR_URL}${user?.avatar}`}
        role={user?.role}
        name={`${user?.firstName} ${user?.lastName}`}
        email={user?.email}
      />
      {/* <Heading
        header={"My Donations"}
        btnName={"Donate"}
        btnLink={"/"}
        btnIcon={<VolunteerActivismIcon />}
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <DonationList amount={"500"} date={"Jan 9, 2014"} />
      </List> */}
    </Stack>
  );
};

export default DashProfile;
