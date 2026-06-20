import { RootState } from "../../store/store";

export const selectProfileImage = (state: RootState) =>
  state.profile.image;