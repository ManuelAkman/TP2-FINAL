import Producto from '../models/producto.js';
import productoRepository from '../repository/productoRepository.js';

class ProductoService {
  async createProducto(data) {
    // Validate required fields
    if (!data.producto || data.producto.trim() === '') {
      throw new Error('El nombre del producto es requerido y no puede estar vacío');
    }

    if (data.stockAmount === undefined || data.stockAmount === null) {
      throw new Error('Se debe definir el stock del producto');
    }

    if (!Number.isInteger(data.stockAmount) || data.stockAmount < 0) {
      throw new Error('El stock debe ser un entero mayor o igual a 0');
    }

    // Create new producto instance
    const producto = new Producto({
      producto: data.producto,
      stockAmount: data.stockAmount,
      fechaIngreso: data.fechaIngreso
    });

    // Save to repository
    return await productoRepository.create(producto.toJSON());
  }

  async getAllProductos() {
    return await productoRepository.getAll();
  }

  async getProductoById(id) {
    const producto = await productoRepository.getById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  }

  async updateProducto(id, data) {
    // Validate if producto exists
    const existingProducto = await productoRepository.getById(id);
    if (!existingProducto) {
      throw new Error('Producto no encontrado');
    }

    // Validate fields if provided
    if (data.producto !== undefined && data.producto.trim() === '') {
      throw new Error('producto no puede estar vacío');
    }

    if (data.stockAmount !== undefined && (!Number.isInteger(data.stockAmount) || data.stockAmount < 0)) {
      throw new Error('El stock debe ser un entero mayor o igual a 0');
    }

    // Prevent id changes from client input
    const updatePayload = { ...data };
    if (updatePayload.id) {
      delete updatePayload.id;
    }

    return await productoRepository.update(id, updatePayload);
  }

  async deleteProducto(id) {
    const deleted = await productoRepository.delete(id);
    if (!deleted) {
      throw new Error('Producto no encontrado');
    }
    return deleted;
  }
}

export default new ProductoService();
