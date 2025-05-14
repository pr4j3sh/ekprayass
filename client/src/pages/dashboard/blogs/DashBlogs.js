import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import BlogCard from "../../../components/cards/BlogCard";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../../features/blogs/blogSlice";

const DashBlogs = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { blogs, isLoading } = useSelector((state) => state.blog);

  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const filteredBlogs = blogs.filter((blog) => blog.author.id === id);
    setUserBlogs(filteredBlogs);
  }, [blogs, id]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading
        header={"My Blogs"}
        isSearch={true}
        btnName={user?.role === "marshal" ? "Add Blog" : null}
        btnLink={"/dashboard/blogs/add"}
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
          {userBlogs.length > 0 ? (
            userBlogs.map((blog) => (
              <Grid item xs={2} sm={4} md={4} key={blog._id}>
                <BlogCard
                  id={blog._id}
                  author={blog.author.name}
                  authorImg={`${process.env.REACT_APP_AVATAR_URL}${blog?.author.avatar}`}
                  createdAt={blog.createdAt}
                  img={`${process.env.REACT_APP_BLOG_URL}${blog?.image}`}
                  title={blog.title}
                  desc={blog.description}
                  btnName={"Read more"}
                  btnLink={`/dashboard/blogs/${blog._id}`}
                />
              </Grid>
            ))
          ) : (
            <Alert severity="warning">No blogs found</Alert>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default DashBlogs;
