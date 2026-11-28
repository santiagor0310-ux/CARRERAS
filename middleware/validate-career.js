/**
 * Middleware que valida los datos de una carrera antes de llegar al router.
 * Solo revisa las peticiones que envían datos (POST y PUT).
 * Si los datos son correctos llama a next() y la petición sigue;
 * si no, pasa un error 400 y la petición no llega al controller.
 * @param {*} req
 * @param {*} _res
 * @param {Function} next
 */
function validateCareer(req, _res, next) {
  if (req.method !== "POST" && req.method !== "PUT") {
    return next();
  }

  const career = req.body;

  if (
    !career ||
    typeof career !== "object" ||
    Array.isArray(career) ||
    typeof career.nombre !== "string" ||
    career.nombre.trim() === "" ||
    typeof career.nivel !== "string" ||
    career.nivel.trim() === ""
  ) {
    const error = new Error(
      "La carrera debe tener un nombre y un nivel que no estén vacíos",
    );
    error.status = 400;
    return next(error);
  }

  next();
}

module.exports = validateCareer;
