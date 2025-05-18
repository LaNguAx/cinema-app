import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedSeat {
  id: string;
  number: number;
}

interface UserState {
  name: string;
  selectedSeats: SelectedSeat[];
}

const initialState: UserState = {
  name: '',
  selectedSeats: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedSeats(state, action: PayloadAction<SelectedSeat[]>) {
      state.selectedSeats = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    addSeat(state, action: PayloadAction<SelectedSeat>) {
      state.selectedSeats.push(action.payload);
    },
    removeSeat(state, action: PayloadAction<string>) {
      state.selectedSeats = state.selectedSeats.filter(
        (seat) => seat.id !== action.payload
      );
    },
    clearSelectedSeats(state) {
      state.selectedSeats = [];
    },
  },
});

export const {
  setSelectedSeats,
  setUserName,
  addSeat,
  removeSeat,
  clearSelectedSeats,
} = userSlice.actions;
export default userSlice.reducer;
