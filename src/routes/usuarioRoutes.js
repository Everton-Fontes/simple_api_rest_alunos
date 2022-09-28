import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';
import jwtCheck from '../middlewares/jwtCheck';

const router = new Router();

router.post('/', usuarioController.create);
router.put('/', jwtCheck, usuarioController.update);
router.delete('/', jwtCheck, usuarioController.delete);

export default router;
