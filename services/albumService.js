import productoRepository from '../repository/productoRepository.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AlbumService {
  async fetchAndGenerateCSV() {
    // Obtener productos de la base de datos local
    const productos = await productoRepository.getAll();
    
    // Tomar los primeros 15 elementos
    const first15 = productos.slice(0, 15);

    // Generar contenido CSV con los campos del producto
    const csvHeader = 'id,producto,stockAmount,fechaIngreso\n';
    const csvRows = first15.map(p => 
      `${p.id},"${p.producto.replace(/"/g, '""')}",${p.stockAmount},${p.fechaIngreso}`
    ).join('\n');
    const csvContent = csvHeader + csvRows;

    // Guardar en archivo
    const filePath = path.join(__dirname, '../albums_15.csv');
    await fs.writeFile(filePath, csvContent, 'utf-8');

    return {
      csvContent,
      filePath,
      count: first15.length
    };
  }
}

export default new AlbumService();
