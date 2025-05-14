import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../../../features/videos/videoSlice";
import { Skeleton, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";

const DashViewVideo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, isLoading } = useSelector((state) => state.video);

  useEffect(() => {
    if (id) {
      dispatch(getVideo(id));
    }
  }, [id, dispatch]);

  return (
    <Stack spacing={2}>
      {isLoading ? (
        <Skeleton animation={"wave"} />
      ) : (
        <>
          <ReactPlayer width={"100%"} url={video?.url} controls={true} />
          <Typography gutterBottom variant="h5" component="div">
            {video?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video?.description}
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default DashViewVideo;
