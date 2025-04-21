import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem, SocialLink } from "@/utils/interface/interface";

 interface ContactProp {
  socialLinks: SocialLink[];
  contactData: ContactItem[];
}

const initialState: ContactProp = {
  socialLinks: [],
  contactData: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContactList: (state, action: PayloadAction<ContactProp>) => {
      state.socialLinks = action.payload.socialLinks;
      state.contactData = action.payload.contactData;
    },
  },
});

export const { updateContactList } = contactSlice.actions;
export default contactSlice.reducer;
