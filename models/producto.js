import { randomUUID } from 'crypto';

class Producto {
  constructor({ id, producto, stockAmount, fechaIngreso }) {
    this.id = id || randomUUID();
    this.producto = producto;
    this.stockAmount = stockAmount;
    
    // Establecer fechaIngreso con valor por defecto de la fecha actual en formato YYYY-MM-DD
    if (fechaIngreso) {
      this.fechaIngreso = fechaIngreso;
    } else {
      const now = new Date();
      this.fechaIngreso = now.toISOString().split('T')[0];
    }
  }

  // Convertir a objeto plano
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
