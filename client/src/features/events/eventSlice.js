import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createEventService,
  deleteEventService,
  getEventService,
  getEventsService,
  updateEventService,
} from "./eventService";

const initialState = {
  event: null,
  events: [],
  isLoading: false,
  message: "",
};

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (id, thunkAPI) => {
    try {
      return await getEventService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getEvents = createAsyncThunk(
  "event/getEvents",
  async (_, thunkAPI) => {
    try {
      return await getEventsService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (userData, thunkAPI) => {
    try {
      return await createEventService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (userData, thunkAPI) => {
    try {
      return await updateEventService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id, thunkAPI) => {
    try {
      return await deleteEventService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event = action.payload;
        state.isLoading = false;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.event = null;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.isLoading = false;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.events = [];
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        state.isLoading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload._id
        );
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default eventSlice.reducer;
