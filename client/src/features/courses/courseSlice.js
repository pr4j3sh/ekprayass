import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCourseService,
  deleteCourseService,
  getCourseService,
  getCoursesService,
  updateCourseService,
} from "./courseService";

const initialState = {
  course: null,
  courses: [],
  isLoading: false,
  message: "",
};

export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (id, thunkAPI) => {
    try {
      return await getCourseService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, thunkAPI) => {
    try {
      return await getCoursesService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (userData, thunkAPI) => {
    try {
      return await createCourseService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (userData, thunkAPI) => {
    try {
      return await updateCourseService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id, thunkAPI) => {
    try {
      return await deleteCourseService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.isLoading = false;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.course = null;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.isLoading = false;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.courses = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
        state.isLoading = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload._id
        );
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default courseSlice.reducer;
