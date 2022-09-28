import { Router } from 'express';

import fotoController from '../controllers/FotoController';

import jwtCheck from '../middlewares/jwtCheck';

const router = new Router();

router.post('/', jwtCheck, fotoController.create);

export default router;
