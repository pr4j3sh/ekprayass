import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import posterReducer from "../features/posters/posterSlice";
import blogReducer from "../features/blogs/blogSlice";
import courseReducer from "../features/courses/courseSlice";
import eventReducer from "../features/events/eventSlice";
import videoReducer from "../features/videos/videoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    blog: blogReducer,
    course: courseReducer,
    event: eventReducer,
    poster: posterReducer,
    video: videoReducer,
  },
});
