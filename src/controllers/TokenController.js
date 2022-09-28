import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel';

class TokenController {
  async create(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Credenciais inválidas'],
        });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Usuario não existe'],
        });
      }

      if (!(usuario.passwordIsValid(password))) {
        return res.status(401).json({
          status: 'Unauthorized',
          error: ['Não autorizado'],
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
      );

      return res.status(200).json({
        status: 'ok',
        token,
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new TokenController();
