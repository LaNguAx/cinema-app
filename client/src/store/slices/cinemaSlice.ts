import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MovieSummary {
  id: string;
  title: string;
}

interface CinemaState {
  id: string | null;
  name: string | null;
  movies: MovieSummary[];
}

const initialState: CinemaState = {
  id: null,
  name: null,
  movies: [],
};

const cinemaSlice = createSlice({
  name: 'cinema',
  initialState,
  reducers: {
    setCinema(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        movies: MovieSummary[];
      }>
    ) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.movies = action.payload.movies;
    },
    clearCinema(state) {
      state.id = null;
      state.name = null;
      state.movies = [];
    },
  },
});

export const { setCinema, clearCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
