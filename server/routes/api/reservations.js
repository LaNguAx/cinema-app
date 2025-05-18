// routes/reservationRoutes.js
import express from 'express';
import { reservationsController } from '../../controllers/reservations.js';

const router = express.Router();

router.post('/', reservationsController.createReservation);

export { router };
