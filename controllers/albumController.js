import albumService from '../services/albumService.js';

class AlbumController {
  async getAlbumsAsCSV(req, res) {
    try {
      const result = await albumService.fetchAndGenerateCSV();
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="albums_15.csv"');
      res.status(200).send(result.csvContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AlbumController();
