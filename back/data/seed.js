import { Alumno, Curso } from '../models/index.js';

// Carga datos de ejemplo si las tablas están vacías, para poder probar
// los desafíos (GET anidado e inscripción) sin dar de alta todo a mano.
export async function seedIniciales() {
  const cantAlumnos = await Alumno.count();
  if (cantAlumnos === 0) {
    await Alumno.bulkCreate([
      { nombre: 'Sofía Torres', email: 'sofia@mail.com' },
      { nombre: 'Nicolás Díaz', email: 'nicolas@mail.com' },
      { nombre: 'Valentina Ríos', email: 'valentina@mail.com' },
    ]);
  }

  const cantCursos = await Curso.count();
  if (cantCursos === 0) {
    await Curso.bulkCreate([
      { nombre: 'Desarrollo de Software', cupos: 2 },
      { nombre: 'Bases de Datos', cupos: 0 },
      { nombre: 'Redes', cupos: 5 },
    ]);
  }

  if (cantAlumnos === 0 || cantCursos === 0) {
    console.log('Datos de prueba sembrados (alumnos y cursos)');
  }
}
