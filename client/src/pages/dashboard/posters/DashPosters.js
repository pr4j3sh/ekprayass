import { Alert, ImageList, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import PosterCard from "../../../components/cards/PosterCard";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getPosters } from "../../../features/posters/posterSlice";

const DashPosters = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { posters, isLoading } = useSelector((state) => state.poster);
  const [userPosters, setUserPosters] = useState([]);

  useEffect(() => {
    dispatch(getPosters());
  }, [dispatch]);

  useEffect(() => {
    const filteredPosters = posters.filter((poster) => poster.author.id === id);
    setUserPosters(filteredPosters);
  }, [posters, id]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading
        header={"My Posters"}
        isSearch={true}
        btnName={user?.role === "marshal" ? "Add Poster" : null}
        btnLink={"/dashboard/posters/add"}
        btnIcon={<AddIcon />}
      />
      {isLoading ? (
        <Skeleton />
      ) : (
        <ImageList variant="masonry" cols={3} gap={8}>
          {userPosters.length > 0 ? (
            userPosters.map((poster) => (
              <PosterCard
                key={poster._id}
                id={poster._id}
                img={`${process.env.REACT_APP_POSTER_URL}${poster?.image}`}
                title={poster.title}
                author={"John"}
              />
            ))
          ) : (
            <Alert severity="warning">No posters found</Alert>
          )}
        </ImageList>
      )}
    </Stack>
  );
};

export default DashPosters;
