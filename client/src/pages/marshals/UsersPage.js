import { Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import UserCard from "../../components/cards/UserCard";
import Heading from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLess } from "../../features/user/userSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsersLess());
  }, [dispatch]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Inspect. Sensitize. Eradicate."}
        title={
          "Sensitizing and Eradicating the Tobacco Epidemic from the Society"
        }
        desc={
          "Educating the public about the dangers of tobacco use and the benefits of quitting smoking and advocating for policies that reduce the prevalence of tobacco use, including tobacco taxes, smoke-free laws, and restrictions on tobacco advertising and promotion."
        }
      />
      <Heading header={"Our Marshals"} isSearch={true} />
      <Grid
        container
        // py={4}
        direction={{ xs: "column", md: "row" }}
        rowSpacing={{ xs: 4, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {users?.length > 0 ? (
          users.map((user) => (
            <Grid item xs={2} sm={4} key={user?._id} md={4}>
              <UserCard
                img={`${process.env.REACT_APP_AVATAR_URL}${user?.avatar}`}
                role={user?.role}
                name={`${user?.firstName} ${user?.lastName}`}
              />
            </Grid>
          ))
        ) : (
          <>None</>
        )}
      </Grid>
    </Stack>
  );
};

export default UsersPage;
