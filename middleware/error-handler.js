const getErrorStatus = require("../utils/get-error-status.js");
const getErrorMessage = require("../utils/get-error-message.js");

/**
 * Middleware de errores de Express: recibe cualquier error de las rutas
 * y responde con su código HTTP y un mensaje en español.
 * Express lo reconoce como manejador de errores porque recibe 4 parámetros.
 * @param {*} error
 * @param {*} _req
 * @param {*} res
 * @param {Function} _next
 */
function errorHandler(error, _req, res, _next) {
  const status = getErrorStatus(error);
  const message = getErrorMessage(status);

  res.status(status).json({
    error: error.message ? `${message}: ${error.message}` : message,
  });
}

module.exports = errorHandler;
