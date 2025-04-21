import { TestimonialProp } from "@/utils/interface/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
    testimonials: TestimonialProp[] | undefined
}

const initialState: Props = {
    testimonials : undefined
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    updateTestimonials: (state, action:PayloadAction<Props>) => {
      state.testimonials = action.payload.testimonials;
    },
  },
});

export const { updateTestimonials } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
