import express from 'express';
import {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace
} from '../controllers/placesController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getPlaces); // Get only user's places
router.post('/', authenticate, createPlace);
router.put('/:id', authenticate, updatePlace);
router.delete('/:id', authenticate, deletePlace);

export default router;
