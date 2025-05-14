import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPoster } from "../../features/posters/posterSlice";
import { CardMedia, Skeleton, Stack } from "@mui/material";

const ViewPoster = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { poster, isLoading } = useSelector((state) => state.poster);

  useEffect(() => {
    if (id) {
      dispatch(getPoster(id));
    }
  }, [id, dispatch]);

  return (
    <Stack>
      {isLoading ? (
        <Skeleton animation={"wave"} />
      ) : (
        <CardMedia
          sx={{ height: 500 }}
          image={`${process.env.REACT_APP_POSTER_URL}${poster?.image}`}
        />
      )}
    </Stack>
  );
};

export default ViewPoster;
