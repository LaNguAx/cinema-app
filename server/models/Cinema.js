import mongoose from 'mongoose';
const { Schema } = mongoose;

// Embed MovieSchema inside CinemaSchema
import { MoviesModel } from './Movie.js'; // only for types

const CinemaSchema = new Schema(
  {
    name: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  },
  { timestamps: true },
);

const Cinemas = mongoose.model('Cinema', CinemaSchema);
export { Cinemas as CinemaModel };
