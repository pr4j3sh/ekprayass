import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import BlogCard from "../../components/cards/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../features/blogs/blogSlice";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Stay Informed, Stay Empowered"}
        title={"Read Our Latest Blogs"}
        desc={
          "Explore our collection of insightful blogs covering topics related to tobacco awareness, healthy living, and the fight against tobacco addiction. Stay informed and inspired as we share stories, tips, and updates."
        }
      />
      <Heading header={"Our Blogs"} isSearch={true} />
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
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Grid item xs={2} sm={4} md={4} key={blog._id}>
                <BlogCard
                  id={blog._id}
                  author={blog.author.name}
                  authorImg={`${process.env.REACT_APP_AVATAR_URL}${blog?.author.avatar}`}
                  createdAt={blog.createdAt}
                  hide={true}
                  img={`${process.env.REACT_APP_BLOG_URL}${blog?.image}`}
                  title={blog.title}
                  desc={blog.description}
                  btnName={"Read more"}
                  btnLink={`/blogs/${blog._id}`}
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

export default BlogsPage;
