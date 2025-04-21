import { ProgramViewProp } from "@/utils/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProgramViewPropSlice = {
    allProgramDetails: ProgramViewProp[] | undefined
}

const initialState:ProgramViewPropSlice = {
    allProgramDetails : undefined
};

const programDetailsSlice = createSlice({
  name: "programDetails",
  initialState,
  reducers: {
    updateProgramDetails: (state, action: PayloadAction<ProgramViewProp[]>) => {
      state.allProgramDetails = action.payload;
    },
  },
});

export const { updateProgramDetails } = programDetailsSlice.actions;
export default programDetailsSlice.reducer;
