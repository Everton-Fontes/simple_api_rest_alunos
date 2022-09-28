import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import jwtCheck from '../middlewares/jwtCheck';

const router = new Router();

// router.use(jwtCheck);
router.post('/', jwtCheck, alunoController.create);
router.get('/', alunoController.index);
router.get('/:id', alunoController.show);
router.put('/:id', jwtCheck, alunoController.update);
router.delete('/:id', jwtCheck, alunoController.delete);

export default router;
