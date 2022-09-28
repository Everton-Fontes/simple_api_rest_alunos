import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: 'failed',
      error: ['Necessário fazer login'],
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;

    const usuario = await Usuario.findOne({
      where: { id, email },
    });

    if (!usuario) {
      return res.status(401).json({
        status: 'failed',
        error: ['Usuário Inválido'],
      });
    }

    req.userId = id;
    req.userEnail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      status: 'failed',
      error: ['Invalid token'],
    });
  }
};
