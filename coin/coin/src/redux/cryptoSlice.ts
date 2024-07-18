import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Delta {
  hour: number;
  day: number;
  week: number;
  month: number;
  quarter: number;
  year: number;
}

interface Coin {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  delta: Delta;
}

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  coins: [],
  loading: false,
  error: null,
};


export const fetchCoins = createAsyncThunk<Coin[], string>(
  'crypto/fetchCoins',
  async (selectedCode: string) => {
    try {
      const response = await axios.get<Coin[]>(`http://localhost:5000?coin=${selectedCode}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch coins');
    }
  }
);


const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action: PayloadAction<Coin[]>) => {
        state.coins = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch coins';
      });
  },
});

export default cryptoSlice.reducer;
