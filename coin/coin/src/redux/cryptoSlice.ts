import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from './store'; // Adjust the path as per your project structure

interface CryptoState {
  // Define your state structure here
  data: any[]; // Example, adjust as per your actual state structure
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    // Define your reducers here
    updateCryptoData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Define other reducers as needed
    fetchCryptoStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCryptoSuccess(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCryptoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions from slice
export const {
  updateCryptoData,
  fetchCryptoStart,
  fetchCryptoSuccess,
  fetchCryptoFailure,
} = cryptoSlice.actions;

// Thunk action to fetch crypto data from backend
export const fetchCryptoData = (): any => async (dispatch:any) => {
  try {
    dispatch(fetchCryptoStart());
    const response = await axios.get<any[]>('/api/crypto'); // Adjust URL as per your backend
    dispatch(fetchCryptoSuccess(response.data));
  } catch (error:any) {
    dispatch(fetchCryptoFailure(error.message));
  }
};

export default cryptoSlice.reducer;
