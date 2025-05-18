import express from 'express';
import { router as eventsRouter } from './api/eventsRouter.js';
import { router as cinemaRouter } from './api/cinemas.js';
import { router as moviesRouter } from './api/movies.js';
import { router as reservationRouter } from './api/reservations.js';

const router = express.Router();

router.use('/api/events', eventsRouter);
router.use('/api/cinemas', cinemaRouter);
router.use('/api/movies', moviesRouter);
router.use('/api/reservations', reservationRouter);

export { router };
