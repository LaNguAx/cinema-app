import express from 'express';
import cinemasController from '../../controllers/cinemas.js';

const router = express.Router();

router.get('/', cinemasController.getAllCinemas);

export { router };
