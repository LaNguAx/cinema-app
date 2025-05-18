import { getMovieById } from '../services/movies.js';

export const movieController = {
  async getMovie(req, res) {
    try {
      const { id } = req.params;
      const movie = await getMovieById(id);

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.json(movie);
    } catch (err) {
      console.error('Error fetching movie:', err);
      res.status(500).json({ message: 'Server error' });
    }
  },
};
