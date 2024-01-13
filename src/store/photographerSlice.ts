import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PhotographerContoller from "../api/photographerContoller";

type userInfo = {
  id: number;
  email: string;
  firstname: string;
  surname: string;
  middleName: string;
  birthdate: string;
  phone: string;
  contacts: {
    vk: string | null;
    tg: string | null;
  } | null;
  score: number | null;
  status: "created" | "blocked" | "approved";
  registrationDate: string;
  description: string | null;
  trainee: boolean;
  portfolio: string | null;
  techniqueInfoId: number;
};

export const receiveUserById = createAsyncThunk(
  "photographer/getInfo",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      return await PhotographerContoller.getById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeUserInfo = createAsyncThunk(
  "photographer/putInfo",
  async (
    formData: Omit<userInfo, "registrationDate" | "techniqueInfoId">,
    { rejectWithValue }
  ) => {
    try {
      await PhotographerContoller.edit(formData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface PhotographerState {
  photographerProfileInfo: userInfo | {};
}

const initialState: PhotographerState = {
  photographerProfileInfo: {},
};

const photographerSlice = createSlice({
  name: "photographer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      receiveUserById.fulfilled,
      (state, action: PayloadAction<userInfo | any>) => {
        state.photographerProfileInfo = action.payload;
      }
    );
  },
});

export default photographerSlice.reducer;
