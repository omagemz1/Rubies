import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions } from '../services/api';
import { TransactionsState } from '../types';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await getTransactions();
    return response.data;
  }
);

const initialState: TransactionsState = {
  list: [],
  status: 'idle',
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export default transactionsSlice.reducer;
