import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  confirmResetPasswordService,
  loginService,
  logoutService,
  registerService,
  resetPasswordService,
} from "./authService";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const id = Cookies.get("id");

const initialState = {
  status: token ? true : false,
  id: id ? id : null,
  token: token ? token : null,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await loginService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await logoutService();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, thunkAPI) => {
    try {
      return await resetPasswordService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const confirmResetPassword = createAsyncThunk(
  "auth/confirmResetPassword",
  async (userData, thunkAPI) => {
    try {
      return await confirmResetPasswordService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = false;
      state.id = null;
      state.token = null;
      state.message = "";
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = true;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = false;
        state.token = null;
        state.id = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = true;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = false;
        state.token = null;
        state.id = null;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = false;
        state.token = null;
        state.id = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(confirmResetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(confirmResetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
