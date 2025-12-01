import { Router } from 'express';
import productoController from '../controllers/productoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// POST /api/v1/productos - Create new product
router.post('/', (req, res) => productoController.createProducto(req, res));

// GET /api/v1/productos - Get all products
router.get('/', (req, res) => productoController.getAllProductos(req, res));

// GET /api/v1/productos/:id - Get product by ID
router.get('/:id', (req, res) => productoController.getProductoById(req, res));

// PUT /api/v1/productos/:id - Update product
router.put('/:id', authMiddleware, (req, res) => productoController.updateProducto(req, res));

// DELETE /api/v1/productos/:id - Delete product
router.delete('/:id', authMiddleware, (req, res) => productoController.deleteProducto(req, res));

export default router;
