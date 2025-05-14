import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import ActionCard from "../../components/cards/ActionCard";
import Heading from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../features/courses/courseSlice";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Header
        subTitle={"Empowerment Through Education"}
        title={"Explore Our Courses"}
        desc={
          "Join us on a journey of knowledge and empowerment. Discover a range of courses designed to equip you with the skills and insights to become a dedicated Tobacco Marshal. Choose your path towards a tobacco-free society."
        }
      />
      <Heading header={"Our Courses"} isSearch={true} />
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
          {courses.length > 0 ? (
            courses.map((course) => (
              <Grid item xs={2} sm={4} md={4} key={course._id}>
                <ActionCard
                  img={`${process.env.REACT_APP_COURSE_URL}${course?.image}`}
                  title={course.title}
                  desc={course.description}
                  price={course.price}
                  btnName={"Browse Course"}
                  btnLink={""}
                />
              </Grid>
            ))
          ) : (
            <Alert severity="warning">No courses found</Alert>
          )}
        </Grid>
      )}
    </Stack>
  );
};

export default CoursesPage;
