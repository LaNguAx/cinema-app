import mongoose from 'mongoose';
const { Schema } = mongoose;

const SeatSchema = new Schema({
  number: { type: Number, required: true },
  status: {
    type: String,
    enum: ['available', 'reserved', 'approved'],
    default: 'available',
  },
  reservedBy: { type: String, default: null },
  reservedUntil: { type: Date, default: null },
});

const TimeSchema = new Schema({
  index: { type: Number, required: true },
  time: { type: Date, required: true },
  seats: { type: [SeatSchema], required: true },
});

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    times: { type: [TimeSchema], required: true },
  },
  { timestamps: true },
);

const Movies = mongoose.model('Movie', MovieSchema);
export { Movies as MoviesModel };
