import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Heading from "../../../components/Heading";
import VideoCard from "../../../components/cards/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../../features/videos/videoSlice";

const DashVideos = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { videos, isLoading } = useSelector((state) => state.video);
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  useEffect(() => {
    const filteredVideos = videos.filter((video) => video.author.id === id);
    setUserVideos(filteredVideos);
  }, [videos, id]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading
        header={"My Videos"}
        isSearch={true}
        btnName={user?.role === "marshal" ? "Add Video" : null}
        btnLink={"/dashboard/videos/add"}
        btnIcon={<AddIcon />}
      />
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
          {userVideos.length > 0 ? (
            userVideos.map((video) => (
              <Grid item xs={2} sm={4} md={4} key={video._id}>
                <VideoCard
                  id={video._id}
                  author={video.author.name}
                  authorImg={`${process.env.REACT_APP_AVATAR_URL}${video?.author.avatar}`}
                  createdAt={video.createdAt}
                  vid={video.url}
                  title={video.title}
                  desc={video.description}
                  btnName={"Watch"}
                  btnLink={`/dashboard/videos/${video._id}`}
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

export default DashVideos;
