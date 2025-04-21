import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 interface ProgramProp {
  program: string | null
}

const initialState:ProgramProp = {
    program : "artificial-intelligence"
};

const selectedProgramSlice = createSlice({
  name: "selectedPrograms",
  initialState,
  reducers: {
    updateSelectedProgram: (state, action: PayloadAction<ProgramProp>) => {
      state.program = action.payload.program
    },
  },
});

export const { updateSelectedProgram } = selectedProgramSlice.actions;
export default selectedProgramSlice.reducer;
