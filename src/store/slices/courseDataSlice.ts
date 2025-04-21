import { ProgramDetailsProp } from "@/utils/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 type SliceProp = {
    duration: number;
    courseData: ProgramDetailsProp | undefined;
}

const initialState = {
    duration : 3,
    courseData : undefined as ProgramDetailsProp | undefined,
};

const courseDataSlice = createSlice({
  name: "courseData",
  initialState,
  reducers: {
    updateCourseData: (state, action: PayloadAction<SliceProp>) => {
      state.duration = action.payload.duration;
      state.courseData = action.payload.courseData;
    },
  },
});

export const { updateCourseData } = courseDataSlice.actions;
export default courseDataSlice.reducer;
