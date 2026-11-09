// Middleware de errores, ya resuelto — no es el foco de este desafío.
export function errorHandler(err, req, res, next) {
  console.error('Error capturado por errorHandler:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
