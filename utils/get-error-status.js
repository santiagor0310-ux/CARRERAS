/**
 * Devuelve el código HTTP del error.
 * Si el error no trae un código válido (400 a 599), devuelve 500.
 * @param {*} error
 * @returns {number}
 */
function getErrorStatus(error) {
  const status = error?.status;

  if (Number.isInteger(status) && status >= 400 && status <= 599) {
    return status;
  }

  return 500;
}

module.exports = getErrorStatus;
