import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPosterService,
  deletePosterService,
  getPosterService,
  getPostersService,
  updatePosterService,
} from "./posterService";

const initialState = {
  poster: null,
  posters: [],
  isLoading: false,
  message: "",
};

export const getPoster = createAsyncThunk(
  "poster/getPoster",
  async (id, thunkAPI) => {
    try {
      return await getPosterService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getPosters = createAsyncThunk(
  "poster/getPosters",
  async (_, thunkAPI) => {
    try {
      return await getPostersService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createPoster = createAsyncThunk(
  "poster/createPoster",
  async (userData, thunkAPI) => {
    try {
      return await createPosterService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updatePoster = createAsyncThunk(
  "poster/updatePoster",
  async (userData, thunkAPI) => {
    try {
      return await updatePosterService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletePoster = createAsyncThunk(
  "poster/deletePoster",
  async (id, thunkAPI) => {
    try {
      return await deletePosterService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const posterSlice = createSlice({
  name: "poster",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getPoster.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPoster.fulfilled, (state, action) => {
        state.poster = action.payload;
        state.isLoading = false;
      })
      .addCase(getPoster.rejected, (state, action) => {
        state.poster = null;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getPosters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosters.fulfilled, (state, action) => {
        state.posters = action.payload;
        state.isLoading = false;
      })
      .addCase(getPosters.rejected, (state, action) => {
        state.posters = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePoster.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePoster.fulfilled, (state, action) => {
        state.posters = state.posters.map((poster) =>
          poster._id === action.payload._id ? action.payload : poster
        );
        state.isLoading = false;
      })
      .addCase(updatePoster.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deletePoster.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePoster.fulfilled, (state, action) => {
        state.posters = state.posters.filter(
          (poster) => poster._id !== action.payload._id
        );
        // state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deletePoster.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default posterSlice.reducer;
