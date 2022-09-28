import Usuario from '../models/UsuarioModel';

class UsuarioController {
  async create(req, res) {
    try {
      const { nome, email, password } = req.body;

      const userdb = await Usuario.findAll({
        where: {
          email,
        },
      });

      if (userdb) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Usuário já existe no banco'],
        });
      }

      const novoUsuario = await Usuario.create({
        nome,
        email,
        password,
      });

      return res.status(201).json({
        status: 'ok',
        usuario: novoUsuario,
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'email'],
      });
      return res.status(200).json(usuarios);
    } catch (e) {
      return res.status(200).json(null);
    }
  }

  async show(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        status: 'Bad Request',
        error: ['É preciso ter um id'],
      });
    }
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Usuario não existe'],
          usuario,
        });
      }
      const { id, nome, email } = usuario;
      return res.status(200).json({
        status: 'ok',
        usuario: {
          id,
          nome,
          email,
        },
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    if (!req.body) {
      return res.status(400).json({
        status: 'Bad Request',
        error: ['Tipo de dado inválido : null'],
      });
    }
    try {
      const usuario = await Usuario.findByPk(req.userId);
      if (!usuario) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Usuario não existe'],
          usuario,
        });
      }

      const novosDados = await usuario.update(req.body);
      const { id, nome, email } = novosDados;
      return res.status(200).json({
        status: 'ok',
        usuario: {
          id,
          nome,
          email,
        },
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId);
      if (!usuario) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Usuario não existe'],
          usuario,
        });
      }

      await usuario.destroy();
      return res.status(200).json({
        status: 'ok',
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new UsuarioController();
