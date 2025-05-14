import { Alert, ImageList, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import PosterCard from "../../components/cards/PosterCard";
import { getPosters } from "../../features/posters/posterSlice";
import { useDispatch, useSelector } from "react-redux";

const PostersPage = () => {
  const dispatch = useDispatch();
  const { posters, isLoading } = useSelector((state) => state.poster);

  useEffect(() => {
    dispatch(getPosters());
  }, [dispatch]);
  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Visualizing Change"}
        title={"View Our Posters"}
        desc={
          "Visual communication is a powerful tool for spreading awareness. Browse our collection of impactful posters that convey the message of a tobacco-free world. Download and share them to inspire change in your community."
        }
      />
      <Heading header={"Our Posters"} isSearch={true} />
      {isLoading ? (
        <Skeleton />
      ) : (
        <ImageList variant="masonry" cols={3} gap={8}>
          {posters.length > 0 ? (
            posters.map((poster) => (
              <PosterCard
                key={poster._id}
                id={poster._id}
                hide={true}
                img={`${process.env.REACT_APP_POSTER_URL}${poster?.image}`}
                title={poster.title}
                author={poster.author.name}
                btnLink={`/posters/${poster._id}`}
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

export default PostersPage;
