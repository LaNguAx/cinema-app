import { CinemaModel } from '../models/Cinema.js';

export async function getAllCinemas() {
  return await CinemaModel.find().populate('movies');
}
