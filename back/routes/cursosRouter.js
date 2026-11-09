import { Router } from 'express';
import { obtenerTodos, obtenerPorId, crear } from '../services/cursosServicios.js';

const router = Router();

// GET /api/cursos
router.get('/', async (req, res) => {
  const cursos = await obtenerTodos();
  res.json(cursos);
});

// GET /api/cursos/:id
router.get('/:id', async (req, res) => {
  const curso = await obtenerPorId(req.params.id);
  if (!curso) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }
  res.json(curso);
});

// POST /api/cursos
router.post('/', async (req, res) => {
  const { nombre, cupos } = req.body;
  const curso = await crear({ nombre, cupos });
  res.status(201).json(curso);
});

export default router;
