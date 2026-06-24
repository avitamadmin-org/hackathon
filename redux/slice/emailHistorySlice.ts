import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmailHistory {
  id: string;
  recipientEmail: string;
  timestamp: string;
  subject: string;
  category: string;
  status: "Pending" | "Sent" | "Failed";
  body: string;
}

interface EmailHistoryState {
  emails: EmailHistory[];
}

const initialState: EmailHistoryState = {
  emails: [],
};

const emailHistorySlice = createSlice({
  name: "emailHistory",
  initialState,
  reducers: {
    addEmailHistory: (state, action: PayloadAction<EmailHistory>) => {
      state.emails.unshift(action.payload);
    },
  },
});

export const { addEmailHistory } = emailHistorySlice.actions;

export default emailHistorySlice.reducer;