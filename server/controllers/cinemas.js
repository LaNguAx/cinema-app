import * as cinemaService from '../services/cinemas.js';

async function getAllCinemas(req, res) {
  try {
    const cinemas = await cinemaService.getAllCinemas();
    res.json(cinemas);
  } catch (err) {
    console.error('❌ Failed to fetch cinemas:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const cinemaController = {
  getAllCinemas,
};

export default cinemaController;
