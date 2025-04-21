import { headingDataType } from "@/utils/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:headingDataType = {
    headingData : undefined,
    error : undefined
};

const headingSlice = createSlice({
  name: "heading",
  initialState,
  reducers: {
    updateHeadings: (state, action: PayloadAction<headingDataType>) => {
      state.headingData = action.payload.headingData;
    },
    updateHeadingsError: (state, action: PayloadAction<headingDataType>) => {
      state.error = action.payload.error;
    },
  },
});

export const { updateHeadings, updateHeadingsError } = headingSlice.actions;
export default headingSlice.reducer;
