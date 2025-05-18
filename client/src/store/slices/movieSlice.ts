import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Seat {
  number: number;
  status: string;
  reservedBy: string | null;
  reservedUntil: string | null;
  _id: string;
}

interface MovieTime {
  index: number;
  time: string;
  seats: Seat[];
  _id: string;
}

interface Movie {
  _id: string;
  title: string;
  times: MovieTime[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  selectedTimeIndex: number;
}

interface MovieState {
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie(state, action: PayloadAction<Movie>) {
      state.selectedMovie = action.payload;
    },

    clearMovie(state) {
      state.selectedMovie = null;
    },
  },
});

export const { setMovie, clearMovie } = movieSlice.actions;
export default movieSlice.reducer;
