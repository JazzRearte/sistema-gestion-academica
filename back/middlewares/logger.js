// Middleware de logging, ya resuelto — no es el foco de este desafío
// (el ejercicio base de sem07 ya lo trabajó en detalle).
function logger(req, res, next) {
  const inicio = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - inicio;
    const status = res.statusCode;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} ${status} (${ms}ms)`);
  });

  next();
}

export default logger;
