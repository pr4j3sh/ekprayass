import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createVideoService,
  deleteVideoService,
  getVideoService,
  getVideosService,
  updateVideoService,
} from "./videoService";

const initialState = {
  video: null,
  videos: [],
  isLoading: false,
  message: "",
};

export const getVideo = createAsyncThunk(
  "video/getVideo",
  async (id, thunkAPI) => {
    try {
      return await getVideoService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getVideos = createAsyncThunk(
  "video/getVideos",
  async (_, thunkAPI) => {
    try {
      return await getVideosService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createVideo = createAsyncThunk(
  "video/createVideo",
  async (userData, thunkAPI) => {
    try {
      return await createVideoService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateVideo = createAsyncThunk(
  "video/updateVideo",
  async (userData, thunkAPI) => {
    try {
      return await updateVideoService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteVideo = createAsyncThunk(
  "video/deleteVideo",
  async (id, thunkAPI) => {
    try {
      return await deleteVideoService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.video = action.payload;
        state.isLoading = false;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.video = null;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.isLoading = false;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.videos = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.videos = state.videos.map((video) =>
          video._id === action.payload._id ? action.payload : video
        );
        state.isLoading = false;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(
          (video) => video._id !== action.payload._id
        );
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default videoSlice.reducer;
