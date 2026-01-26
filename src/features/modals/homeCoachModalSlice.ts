import { createSlice } from "@reduxjs/toolkit";

type HomeCoachModalState = {
  open: boolean;
};

const initialState: HomeCoachModalState = {
  open: false,
};

const homeCoachModalSlice = createSlice({
  name: "homeCoachModal",
  initialState,
  reducers: {
    openHomeCoachModal: (state) => {
      state.open = true;
    },
    closeHomeCoachModal: (state) => {
      state.open = false;
    },
    setHomeCoachModalOpen: (state, action: { payload: boolean }) => {
      state.open = action.payload;
    },
  },
});

export const {
  openHomeCoachModal,
  closeHomeCoachModal,
  setHomeCoachModalOpen,
} = homeCoachModalSlice.actions;

export default homeCoachModalSlice.reducer;
