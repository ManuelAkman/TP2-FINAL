import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../database/database.json');

class ProductoRepository {
  async getAll() {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const productos = await this.getAll();
    return productos.find(p => p.id === id);
  }

  async create(producto) {
    const productos = await this.getAll();
    productos.push(producto);
    await fs.writeFile(DB_PATH, JSON.stringify(productos, null, 2), 'utf-8');
    return producto;
  }

  async update(id, productoData) {
    const productos = await this.getAll();
    const index = productos.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    productos[index] = { ...productos[index], ...productoData };
    await fs.writeFile(DB_PATH, JSON.stringify(productos, null, 2), 'utf-8');
    return productos[index];
  }

  async delete(id) {
    const productos = await this.getAll();
    const filtered = productos.filter(p => p.id !== id);
    
    if (productos.length === filtered.length) {
      return false;
    }

    await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
}

export default new ProductoRepository();
