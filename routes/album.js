import { Router } from 'express';
import albumController from '../controllers/albumController.js';

const router = Router();

// GET /api/v1/albums/csv - Obtener productos y devolverlos como CSV
router.get('/csv', (req, res) => albumController.getAlbumsAsCSV(req, res));

export default router;
