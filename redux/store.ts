import { configureStore } from "@reduxjs/toolkit";
import emailHistoryReducer from "./slice/emailHistorySlice";

export const store = configureStore({
    reducer: {
      emailHistory: emailHistoryReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;