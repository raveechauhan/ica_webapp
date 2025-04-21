import { ProgramsSliceProp } from "@/utils/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:ProgramsSliceProp = {
    programsData : []
};

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    updatePrograms: (state, action: PayloadAction<ProgramsSliceProp>) => {
      state.programsData = action.payload.programsData;
    },
  },
});

export const { updatePrograms } = programsSlice.actions;
export default programsSlice.reducer;
