import { Router } from 'express';
import productoController from '../controllers/productoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// POST /api/v1/productos - Crear nuevo producto
router.post('/', (req, res) => productoController.createProducto(req, res));

// GET /api/v1/productos - Obtener todos los productos
router.get('/', (req, res) => productoController.getAllProductos(req, res));

// GET /api/v1/productos/:id - Obtener producto por ID
router.get('/:id', (req, res) => productoController.getProductoById(req, res));

// PUT /api/v1/productos/:id - Actualizar producto
router.put('/:id', authMiddleware, (req, res) => productoController.updateProducto(req, res));

// DELETE /api/v1/productos/:id - Eliminar producto
router.delete('/:id', authMiddleware, (req, res) => productoController.deleteProducto(req, res));

export default router;
