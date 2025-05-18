import { MoviesModel } from '../models/Movie.js';

export async function getMovieById(movieId) {
  return await MoviesModel.findById(movieId);
}
