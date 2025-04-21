import { ProgramDataProp, programProp } from "@/utils/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:ProgramDataProp = {
    availablePrograms: undefined
};

const availableProgramsSlice = createSlice({
  name: "availablePrograms",
  initialState,
  reducers: {
    updateAvailablePrograms: (state, action: PayloadAction<programProp[] | undefined>) => {
      state.availablePrograms = action.payload;
    },
  },
});

export const { updateAvailablePrograms } = availableProgramsSlice.actions;
export default availableProgramsSlice.reducer;
