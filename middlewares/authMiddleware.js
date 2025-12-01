import config from '../config/index.js';

export default function authMiddleware(req, res, next) {
  const apiKey = req.header('x-api-key');
  
  // Debug logging
  console.log('Received API Key:', apiKey);
  console.log('Expected API Key:', config.apiKey);
  
  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({ error: 'No está autorizado a hacer esta acción' });
  }
  next();
}
