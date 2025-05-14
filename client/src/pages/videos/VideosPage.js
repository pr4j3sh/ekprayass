import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import VideoCard from "../../components/cards/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../features/videos/videoSlice";

const VideosPage = () => {
  const dispatch = useDispatch();
  const { videos, isLoading } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Watch, Learn, Act"}
        title={"Watch Our Videos"}
        desc={
          "Engage with our compelling video content that educates, motivates, and inspires action against tobacco use. From informative documentaries to inspiring testimonials, our videos empower you to be part of the change."
        }
      />
      <Heading header={"Our Videos"} isSearch={true} />
      {isLoading ? (
        <Skeleton />
      ) : (
        <Grid
          container
          // py={4}
          direction={{ xs: "column", md: "row" }}
          rowSpacing={{ xs: 4, md: 1 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {videos.length > 0 ? (
            videos.map((video) => (
              <Grid item xs={2} sm={4} md={4} key={video._id}>
                <VideoCard
                  id={video._id}
                  author={video.author.name}
                  authorImg={`${process.env.REACT_APP_AVATAR_URL}${video?.author.avatar}`}
                  createdAt={video.createdAt}
                  hide={true}
                  vid={video.url}
                  title={video.title}
                  desc={video.description}
                  btnName={"Watch"}
                  btnLink={`/videos/${video._id}`}
                />
              </Grid>
            ))
          ) : (
            <Alert severity="warning">No videos found</Alert>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default VideosPage;
