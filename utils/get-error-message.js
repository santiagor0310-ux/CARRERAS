/**
 * Devuelve un mensaje en español según el código HTTP.
 * @param {number} status
 * @returns {string}
 */
function getErrorMessage(status) {
  switch (status) {
    case 400:
      return "La solicitud enviada no es válida";
    case 404:
      return "No se encontró el recurso solicitado";
    default:
      return "Ocurrió un error en el servidor";
  }
}

module.exports = getErrorMessage;
