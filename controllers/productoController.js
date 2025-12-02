import productoService from '../services/productoService.js';

class ProductoController {
  async createProducto(req, res) {
    try {
      const producto = await productoService.createProducto(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllProductos(req, res) {
    try {
      const productos = await productoService.getAllProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductoById(req, res) {
    try {
      const producto = await productoService.getProductoById(req.params.id);
      res.status(200).json(producto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProducto(req, res) {
    try {
      const producto = await productoService.updateProducto(req.params.id, req.body);
      res.status(200).json(producto);
    } catch (error) {
      const status = error.message === 'Producto no encontrado' ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async deleteProducto(req, res) {
    try {
      await productoService.deleteProducto(req.params.id);
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new ProductoController();
