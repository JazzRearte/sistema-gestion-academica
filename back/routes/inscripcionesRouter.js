
import { Router } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { inscribir } from '../services/alumnosServicios.js';

const router = Router();

// POST /api/inscripciones
router.post('/', async (req, res) => {
  try {
    // Convertir los IDs recibidos a números
    const alumnoId = Number(req.body.alumnoId);
    const cursoId = Number(req.body.cursoId);

    // Validar los IDs
    if (
      !Number.isSafeInteger(alumnoId) ||
      !Number.isSafeInteger(cursoId) ||
      alumnoId <= 0 ||
      cursoId <= 0
    ) {
      return res.status(400).json({
        error: 'Debe ingresar un alumnoId y cursoId válidos'
      });
    }

    // Realizar la inscripción
    const inscripcion = await inscribir({
      alumnoId,
      cursoId
    });

    return res.status(201).json(inscripcion);

  } catch (error) {

    // Inscripción duplicada
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        error: 'El alumno ya se encuentra inscripto en este curso'
      });
    }

    // Errores controlados del servicio
    if ([400, 404, 409].includes(error.status)) {
      return res.status(error.status).json({
        error: error.message
      });
    }

    // Errores inesperados
    console.error('Error al inscribir:', error);

    return res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

export default router;

