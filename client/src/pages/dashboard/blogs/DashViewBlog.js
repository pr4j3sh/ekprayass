import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlog } from "../../../features/blogs/blogSlice";
import { CardMedia, Skeleton, Stack, Typography } from "@mui/material";
import DOMPurify from "dompurify";

const DashViewBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, isLoading } = useSelector((state) => state.blog);
  const sanitizedDesc = DOMPurify.sanitize(blog?.description);
  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id, dispatch]);
  return (
    <Stack>
      {isLoading ? (
        <Skeleton animation={"wave"} />
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            {blog?.title}
          </Typography>
          <CardMedia
            sx={{ height: 500 }}
            image={`${process.env.REACT_APP_BLOG_URL}${blog?.image}`}
          />
          <Typography
            dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
          ></Typography>
        </>
      )}
    </Stack>
  );
};

export default DashViewBlog;
