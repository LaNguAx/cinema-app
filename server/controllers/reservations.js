// controllers/reservationController.js
import { MoviesModel } from '../models/Movie.js';

export const reservationsController = {
  async createReservation(req, res) {
    try {
      const { movieId, timeIndex, seats, reservedBy } = req.body;

      const movie = await MoviesModel.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });

      const timeSlot = movie.times[timeIndex];
      if (!timeSlot)
        return res.status(400).json({ message: 'Invalid time index' });

      const updatedSeats = timeSlot.seats.map((seat) => {
        const match = seats.find((s) => s.id === seat._id.toString());
        if (match) {
          if (seat.status !== 'available') {
            const err = new Error(`Seat ${seat.number} is already reserved`);
            err.code = 'SEAT_TAKEN';
            err.seatId = seat.number.toString();
            throw err;
          }

          seat.status = 'reserved';
          seat.reservedBy = reservedBy || 'unknown';
          seat.reservedUntil = new Date(Date.now() + 1000 * 60 * 30);
        }
        return seat;
      });

      movie.times[timeIndex].seats = updatedSeats;
      await movie.save();

      res.status(200).json({
        message: 'Reservation confirmed',
        reservedSeats: seats,
      });
    } catch (err) {
      console.error('❌ Reservation Error:', err.message);

      res.status(500).json({
        message: err.message || 'Internal Server Error',
        code: err.code || 'UNKNOWN',
        seatId: err.seatId || null,
      });
    }
  },
};
