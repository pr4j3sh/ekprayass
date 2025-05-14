import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import ActionCard from "../../../components/cards/ActionCard";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../features/courses/courseSlice";

const DashCourses = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { courses, isLoading } = useSelector((state) => state.course);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
      course.enrollments.some((enrollment) => enrollment.user.id === id)
    );
    setUserCourses(filteredCourses);
  }, [courses, id]);

  return (
    <Stack direction={"column"} spacing={6}>
      <Heading
        header={"My Courses"}
        isSearch={true}
        // btnName={user?.role === "marshal" ? "Add Course" : null}
        btnName={null}
        btnLink={"/"}
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
          {userCourses.length > 0 ? (
            userCourses.map((course) => (
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

export default DashCourses;
