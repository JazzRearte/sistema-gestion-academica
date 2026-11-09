// Punto único donde se declaran las relaciones entre modelos (evita imports
// circulares entre Alumno.js y Curso.js). Se importa desde index.js ANTES de
// sequelize.sync(), para que la tabla intermedia "inscripciones" ya esté
// declarada al crear las tablas.
import Alumno from './Alumno.js';
import Curso from './Curso.js';
import Inscripcion from './Inscripcion.js';

// N:M: un alumno tiene muchos cursos, un curso tiene muchos alumnos,
// y la tabla "inscripciones" es la que guarda cada combinación.
Alumno.belongsToMany(Curso, {
  through: Inscripcion,
  foreignKey: 'alumnoId',
  otherKey: 'cursoId',
  as: 'cursos',
});
Curso.belongsToMany(Alumno, {
  through: Inscripcion,
  foreignKey: 'cursoId',
  otherKey: 'alumnoId',
  as: 'alumnos',
});

export { Alumno, Curso, Inscripcion };
