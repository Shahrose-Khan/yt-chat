// historySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action creator to fetch history from the database
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/history"); // Assuming your API endpoint for fetching history is '/api/history'
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
    selectedHistory: null,
    loading: false,
    error: null,
  },
  reducers: {
    addHistoryItem: (state, action) => {
      const newItem = {
        id: action.payload.history_id,
        title: action.payload.metadata.title,
        timestamp: Date.now(),
      };
      state.history.push(newItem);
      state.selectedHistory = action.payload.history_id;
    },
    updateHistoryId: (state, action) => {
      state.selectedHistory = action.payload.history_id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.history = action.payload;
      state.error = null;
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addHistoryItem, updateHistoryId } = historySlice.actions;

export default historySlice.reducer;
