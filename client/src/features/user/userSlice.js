import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserService,
  getUserService,
  getUsersLessService,
  getUsersService,
  updateUserService,
} from "./userService";

const initialState = {
  user: null,
  users: [],
  isLoading: false,
  message: "",
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      return await getUserService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsersLess = createAsyncThunk(
  "user/getUsersLess",
  async (_, thunkAPI) => {
    try {
      return await getUsersLessService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      return await getUsersService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await updateUserService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await deleteUserService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersLess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersLess.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersLess.rejected, (state, action) => {
        state.users = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.user._id === action.payload._id) {
          state.user = action.payload;
        }
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
