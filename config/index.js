import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY || 'FINALTP2',
  // Agregar más variables de entorno aquí según sea necesario
};

export default config;
