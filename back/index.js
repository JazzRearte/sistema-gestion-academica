import express from 'express';
import cors from 'cors';

import sequelize from './data/db.js';
import { seedIniciales } from './data/seed.js';
import alumnosRouter from './routes/alumnosRouter.js';
import cursosRouter from './routes/cursosRouter.js';
import inscripcionesRouter from './routes/inscripcionesRouter.js';
import logger from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
// Registra las asociaciones Alumno-Curso-Inscripcion antes de sync() (ver models/index.js).
import './models/index.js';

const app = express();
const PORT = 3001; // puerto distinto al del ejercicio base (3000), para poder correr los dos juntos

// ── Middlewares ───────────────────────────────────────────────────
// Ya resueltos: el foco de este desafío es la relación N:M, el GET anidado
// y la transacción, no repetir lo que ya se vio en el ejercicio base.
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido a la API de Alumnos y Cursos!' });
});

app.use('/api/alumnos', alumnosRouter);
app.use('/api/cursos', cursosRouter);
app.use('/api/inscripciones', inscripcionesRouter);

// Catch-all 404
app.use((req, res) => res.status(404).json({ error: 'Api no encontrada' }));

app.use(errorHandler);

async function iniciar() {
  await sequelize.sync({ force: false });
  await seedIniciales();

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

iniciar();
