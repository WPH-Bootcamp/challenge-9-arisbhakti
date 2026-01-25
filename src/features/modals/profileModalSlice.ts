import { createSlice } from "@reduxjs/toolkit";

type ProfileModalState = {
  open: boolean;
};

const initialState: ProfileModalState = {
  open: false,
};

const profileModalSlice = createSlice({
  name: "profileModal",
  initialState,
  reducers: {
    openProfileModal: (state) => {
      state.open = true;
    },
    closeProfileModal: (state) => {
      state.open = false;
    },
    setProfileModalOpen: (state, action: { payload: boolean }) => {
      state.open = action.payload;
    },
  },
});

export const { openProfileModal, closeProfileModal, setProfileModalOpen } =
  profileModalSlice.actions;

export default profileModalSlice.reducer;
