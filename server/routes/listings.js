import express from 'express';

import { getListing, createListing, updateListing, deleteListing, likeListing } from '../controllers/listings.js';

const router = express.Router();

// get the middleware
import auth from "../middleware/auth.js";

// Get routes from controllers
router.get('/', getListing);
router.post('/', auth, createListing);  // in order to create, need to be a valid user
router.patch('/:id', auth, updateListing)  // update post tat the user created (frontend)
router.delete('/:id', auth, deleteListing); // delete post tat the user created (frontend)
router.patch('/:id/likeListing', auth, likeListing); // only like once for the specified id (backend)

export default router;