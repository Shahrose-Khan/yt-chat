// messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addHistoryItem, updateHistoryId } from "../history/historySlice";

const initialState = {
  messages: [],
  isLoading: false,
  error: "",
};

export const fetchResponse = createAsyncThunk("response", (message) => {
  return axios
    .post("http://127.0.0.1:5000/query_video", {
      query: message.newMessage,
      history_id: message.historyId,
    })
    .then((response) => response.data);
});

export const fetchChatHistory = createAsyncThunk(
  "chatHistory",
  async (historyId, { dispatch }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/chat_history/${historyId}`
      );
      dispatch(updateHistoryId({ history_id: historyId }));

      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

export const fetchSummaryResponse = createAsyncThunk(
  "summary",
  async (url, { dispatch }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze_video", {
        url,
      });
      dispatch(addHistoryItem(response.data)); // Dispatch addHistoryItem with the video title
      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    handleNewChat(state, action) {
      state.messages = [];
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResponse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchResponse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages.push({ text: action.payload.message, sender: "theirs" });
      state.error = "";
    });
    builder.addCase(fetchResponse.rejected, (state, action) => {
      state.isLoading = false;
      state.messages.push({ text: action.error.message, sender: "theirs" });
      state.error = action.error.message;
    });

    builder.addCase(fetchSummaryResponse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSummaryResponse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages.push({
        text: action.payload.message,
        metadata: action.payload.metadata,
        keywords: action.payload.keywords,
        sender: "theirs",
      });
      state.error = "";
    });
    builder.addCase(fetchSummaryResponse.rejected, (state, action) => {
      state.isLoading = false;
      state.messages.push({ text: action.error.message, sender: "theirs" });
      state.error = action.error.message;
    });
    // New extra reducer for fetchChatHistory
    builder.addCase(fetchChatHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      // Assuming the payload is an array of messages
      state.messages = action.payload.map((message) => {
        const messageObj = {
          text: message.message, // Assuming the message is stored in the `message` property
          sender: message.agent === "user" ? "mine" : "theirs",
        };
        // If the message contains metadata, add it to the message object
        if (message.metadata) {
          messageObj.metadata = message.metadata;
          messageObj.keywords = message.keywords;
        }
        return messageObj;
      });
      state.error = "";
    });
    builder.addCase(fetchChatHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addMessage, handleNewChat } = messageSlice.actions;

export default messageSlice.reducer;
