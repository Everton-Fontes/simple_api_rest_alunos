import multer from 'multer';

import multerConfig from '../config/multer';
import Foto from '../models/FotoModel';

const upload = multer(multerConfig).single('photo');

class FotoController {
  async create(req, res) {
    return upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'Bad Request',
          error: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = Foto.create({
          originalname,
          filename,
          aluno_id,
        });

        return res.status(200).json({
          status: 'ok',
          foto,
        });
      } catch (e) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Aluno não existe'],
        });
      }
    });

    //
  }
}

export default new FotoController();
