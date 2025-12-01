import { randomUUID } from 'crypto';

class Producto {
  constructor({ id, producto, stockAmount, fechaIngreso }) {
    this.id = id || randomUUID();
    this.producto = producto;
    this.stockAmount = stockAmount;
    
    // Set fechaIngreso with default to current date in YYYY-MM-DD format
    if (fechaIngreso) {
      this.fechaIngreso = fechaIngreso;
    } else {
      const now = new Date();
      this.fechaIngreso = now.toISOString().split('T')[0];
    }
  }

  // Convert to plain object
  toJSON() {
    return {
      id: this.id,
      producto: this.producto,
      stockAmount: this.stockAmount,
      fechaIngreso: this.fechaIngreso
    };
  }
}

export default Producto;
