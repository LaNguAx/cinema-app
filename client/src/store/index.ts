import { configureStore } from '@reduxjs/toolkit';
import cinemaReducer from './slices/cinemaSlice';
import movieReducer from './slices/movieSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    cinema: cinemaReducer,
    movie: movieReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
