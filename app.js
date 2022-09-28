import dotenv from 'dotenv';

dotenv.config();
import cors from 'cors';
import helmet from 'helmet';

import { resolve } from 'path';
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokensRoutes from './src/routes/tokenRoutes';
import fotoRoutes from './src/routes/fotoRoutes';

const whiteList = [
  'https://react1.otaviomiranda.com.br',
  'https://react2.otaviomiranda.com.br',
  'https://localhost:3001',
  'http://localhost:3001',
  process.env.APP_URL,
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

import './src/database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/usuarios', usuarioRoutes);
    this.app.use('/tokens', tokensRoutes);
    this.app.use('/fotos', fotoRoutes);
  }
}

export default new App().app;
