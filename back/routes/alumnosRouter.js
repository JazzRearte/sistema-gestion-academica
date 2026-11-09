import { Router } from 'express';
import { obtenerTodos, obtenerConCursos, crear } from '../services/alumnosServicios.js';

const router = Router();

// GET /api/alumnos
router.get('/', async (req, res) => {
  const alumnos = await obtenerTodos();
  res.json(alumnos);
});

// GET /api/alumnos/:id — debería devolver el alumno con sus cursos anidados
// una vez resuelto el Desafío 1 en alumnosServicios.js.
router.get('/:id', async (req, res) => {
  const alumno = await obtenerConCursos(req.params.id);
  if (!alumno) {
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }
  res.json(alumno);
});

// POST /api/alumnos
router.post('/', async (req, res) => {
  const { nombre, email } = req.body;
  const alumno = await crear({ nombre, email });
  res.status(201).json(alumno);
});

export default router;
