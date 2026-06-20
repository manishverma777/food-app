// store/profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  image: string;
}

const initialState: ProfileState = {
  image: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
  },
});

export const { setProfileImage } = profileSlice.actions;
export default profileSlice.reducer;