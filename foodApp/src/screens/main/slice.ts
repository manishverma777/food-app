import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    image: '',
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;