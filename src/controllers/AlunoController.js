import Aluno from '../models/AlunoModel';
import Foto from '../models/FotoModel';

class AlunoController {
  async create(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);

      return res.status(201).json({
        status: 'ok',
        aluno: novoAluno,
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
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'desc'], [Foto, 'id', 'desc']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });
      return res.status(200).json(alunos);
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
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'desc'], [Foto, 'id', 'desc']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });
      if (!aluno) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Aluno não existe'],
          aluno,
        });
      }
      return res.status(200).json({
        status: 'ok',
        aluno,
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        status: 'Bad Request',
        error: ['É preciso ter um id'],
      });
    }
    if (!req.body) {
      return res.status(400).json({
        status: 'Bad Request',
        error: ['Tipo de dado inválido : null'],
      });
    }
    try {
      const aluno = await Aluno.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Aluno não existe'],
          aluno,
        });
      }

      const novosDados = await aluno.update(req.body);
      return res.status(200).json({
        status: 'ok',
        aluno: novosDados,
      });
    } catch (e) {
      return res.status(400).json({
        status: 'Bad Request',
        error: e.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    if (!req.params.id) {
      return res.status(400).json({
        status: 'Bad Request',
        error: ['É preciso ter um id'],
      });
    }
    try {
      const aluno = await Aluno.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({
          status: 'Bad Request',
          error: ['Aluno não existe'],
          aluno,
        });
      }

      await aluno.destroy();
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

export default new AlunoController();
