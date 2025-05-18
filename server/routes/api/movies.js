import express from 'express';
import { movieController } from '../../controllers/movies.js';

const router = express.Router();

router.get('/:id', movieController.getMovie);

export { router };
