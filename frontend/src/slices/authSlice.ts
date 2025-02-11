import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../definitions";

interface initialUserState {
  userInfo: IUser | null;
}

const USER_INFO_KEY = "userInfo";

const getStoredUserInfo = (): IUser | null => {
  try {
    const storedData = localStorage.getItem(USER_INFO_KEY);
    return storedData ? (JSON.parse(storedData) as IUser) : null;
  } catch {
    return null;
  }
};

const initialState: initialUserState = {
  userInfo: getStoredUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload;
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem(USER_INFO_KEY);
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, clearCredentials } = authSlice.actions;
