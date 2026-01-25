import { createSlice } from "@reduxjs/toolkit";

type ReviewModalState = {
  open: boolean;
};

const initialState: ReviewModalState = {
  open: false,
};

const reviewModalSlice = createSlice({
  name: "reviewModal",
  initialState,
  reducers: {
    openReviewModal: (state) => {
      state.open = true;
    },
    closeReviewModal: (state) => {
      state.open = false;
    },
    setReviewModalOpen: (state, action: { payload: boolean }) => {
      state.open = action.payload;
    },
  },
});

export const { openReviewModal, closeReviewModal, setReviewModalOpen } =
  reviewModalSlice.actions;

export default reviewModalSlice.reducer;
