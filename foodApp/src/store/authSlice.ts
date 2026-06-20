import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserProfile} from '../types/profile';

export interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
}

interface AuthPayload {
  token: string;
  user: UserProfile;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfile(state, action: PayloadAction<UserProfile>) {
      if (state.user) {
        state.user = action.payload;
      }
    },
  },
});

export const {loginSuccess, logout, updateProfile} = authSlice.actions;
export default authSlice.reducer;
