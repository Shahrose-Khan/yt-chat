// store.js
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../features/message/messageSlice";
import historyReducer, { fetchHistory } from "../features/history/historySlice";

const store = configureStore({
  reducer: {
    message: messageReducer,
    history: historyReducer,
    // Add other reducers here if needed
  },
});

// Dispatch the fetchHistory action when the application starts
store.dispatch(fetchHistory());

export default store;
