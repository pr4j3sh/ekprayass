import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBlogService,
  deleteBlogService,
  getBlogService,
  getBlogsService,
  updateBlogService,
} from "./blogService";

const initialState = {
  blog: null,
  blogs: [],
  isLoading: false,
  message: "",
};

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, thunkAPI) => {
    try {
      return await getBlogService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkAPI) => {
    try {
      return await getBlogsService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (userData, thunkAPI) => {
    try {
      return await createBlogService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (userData, thunkAPI) => {
    try {
      return await updateBlogService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      return await deleteBlogService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.blog = null;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.blogs = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog,
        );
        state.isLoading = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload._id,
        );
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default blogSlice.reducer;
