import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/index.js';
import productoRoutes from './routes/productoRoutes.js';
import albumRoutes from './routes/album.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: config.nodeEnv });
});

// API Routes
app.use('/api/v1/productos', productoRoutes);
app.use('/api/v1/albums', albumRoutes);

export default app;
