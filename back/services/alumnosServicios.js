
import sequelize from '../data/db.js';
import { Alumno, Curso, Inscripcion } from '../models/index.js';

// Obtener todos los alumnos con sus cursos
export async function obtenerTodos() {
  return Alumno.findAll({
    include: {
      model: Curso,
      as: 'cursos'
    }
  });
}

// Obtener un alumno con sus cursos
export async function obtenerConCursos(id) {
  return Alumno.findByPk(id, {
    include: {
      model: Curso,
      as: 'cursos'
    }
  });
}

// Crear un nuevo alumno
export async function crear({ nombre, email }) {
  return Alumno.create({ nombre, email });
}

// Inscribir un alumno a un curso mediante una transacción
export async function inscribir({ alumnoId, cursoId }) {
  return sequelize.transaction(async (t) => {

    // Verificar que el alumno exista
    const alumno = await Alumno.findByPk(alumnoId, {
      transaction: t
    });

    if (!alumno) {
      const error = new Error('El alumno no existe');
      error.status = 404;
      throw error;
    }

    // Verificar que el curso exista
    const curso = await Curso.findByPk(cursoId, {
      transaction: t
    });

    if (!curso) {
      const error = new Error('El curso no existe');
      error.status = 404;
      throw error;
    }

    // Verificar si el alumno ya está inscripto
    const inscripcionExistente = await Inscripcion.findOne({
      where: { alumnoId, cursoId },
      transaction: t
    });

    if (inscripcionExistente) {
      const error = new Error(
        'El alumno ya se encuentra inscripto en este curso'
      );
      error.status = 409;
      throw error;
    }

    // Verificar disponibilidad de cupos
    if (curso.cupos <= 0) {
      const error = new Error(
        'El curso no tiene cupos disponibles'
      );
      error.status = 409;
      throw error;
    }

    // Crear inscripción
    const inscripcion = await Inscripcion.create(
      { alumnoId, cursoId },
      { transaction: t }
    );

    // Descontar un cupo
    curso.cupos -= 1;
    await curso.save({ transaction: t });

    return inscripcion;
  });
}

