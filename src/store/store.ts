// import { configureStore } from "@reduxjs/toolkit";
// import contactSlice from "./slices/contactSlice"
// import selectedProgramSlice from "./slices/selectedProgramSlice"
// import headingSlice from "./slices/headingSlice"
// import programsSlice from "./slices/programsSlice"
// import courseDataSlice from "./slices/courseDataSlice"
// import testimonialsSlice from "./slices/testimonialsSlice"
// import availableProgramsSlice from "./slices/availableProgramsSlice"
// import programDetailsSlice from "./slices/programDetailsSlice"

// const store = configureStore({
//   reducer: {
//      contact: contactSlice,
//      programType: selectedProgramSlice,
//      headings: headingSlice,
//      programs: programsSlice,
//      courseData: courseDataSlice,
//      testimonials: testimonialsSlice,
//      availablePrograms: availableProgramsSlice,
//      programDetails: programDetailsSlice,
//   },
// });
// export { store };

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slices/contactSlice"
import selectedProgramSlice from "./slices/selectedProgramSlice"
import headingSlice from "./slices/headingSlice"
import programsSlice from "./slices/programsSlice"
import courseDataSlice from "./slices/courseDataSlice"
import testimonialsSlice from "./slices/testimonialsSlice"
import availableProgramsSlice from "./slices/availableProgramsSlice"
import programDetailsSlice from "./slices/programDetailsSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
  key: "root",
  storage,
  version: 1
};
const rootReducer = combineReducers({
  contact: contactSlice,
     programType: selectedProgramSlice,
     headings: headingSlice,
     programs: programsSlice,
     courseData: courseDataSlice,
     testimonials: testimonialsSlice,
     availablePrograms: availableProgramsSlice,
     programDetails: programDetailsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
