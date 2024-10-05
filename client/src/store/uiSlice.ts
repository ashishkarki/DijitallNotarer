import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: UIState = {
  isLoading: false,
  successMessage: null,
  errorMessage: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // action to start loading
    startLoading(state) {
      state.isLoading = true;
    },
    // action to stop loading
    stopLoading(state) {
      state.isLoading = false;
    },
    // action to set success message
    setSuccessMessage(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
    // Action to clear success message
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    // Action to set error message
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    // Action to clear error message
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} = uiSlice.actions;

export default uiSlice.reducer;
