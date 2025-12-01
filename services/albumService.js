import productoRepository from '../repository/productoRepository.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AlbumService {
  async fetchAndGenerateCSV() {
    // Fetch productos from local database
    const productos = await productoRepository.getAll();
    
    // Take first 15 items
    const first15 = productos.slice(0, 15);

    // Generate CSV content with producto fields
    const csvHeader = 'id,producto,stockAmount,fechaIngreso\n';
    const csvRows = first15.map(p => 
      `${p.id},"${p.producto.replace(/"/g, '""')}",${p.stockAmount},${p.fechaIngreso}`
    ).join('\n');
    const csvContent = csvHeader + csvRows;

    // Save to file
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
