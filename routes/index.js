const express = require("express");
const router = express.Router();

const CareerMemoryRepository = require("../controller/career-memory-repository.js");
const createCareerRouter = require("./careers.js");

// Una sola instancia guarda las carreras mientras el servidor esté encendido.
const careerRepository = new CareerMemoryRepository();

/**
 * Envía el error al cliente con su código HTTP y un mensaje en español.
 * Si el error no trae un código válido, responde 500.
 * @param {*} res
 * @param {*} error
 */
function handleError(res, error) {
  const status =
    Number.isInteger(error?.status) && error.status >= 400 && error.status <= 599
      ? error.status
      : 500;

  let explanation;

  switch (status) {
    case 400:
      explanation = "La solicitud enviada no es válida";
      break;
    case 404:
      explanation = "No se encontró el recurso solicitado";
      break;
    default:
      explanation = "Ocurrió un error en el servidor";
  }

  const detail = error instanceof Error ? error.message : undefined;
  res.status(status).json({
    error: detail ? `${explanation}: ${detail}` : explanation,
  });
}

// Ruta de bienvenida: muestra las rutas disponibles.
router.get("/", (_req, res) => {
  res.json({
    message: "API de las carreras de la UTAP.",
    routes: [
      "GET /api/careers",
      "GET /api/careers/:id",
      "GET /api/careers/nombre/:nombre",
      "GET /api/careers/nivel/:nivel",
      "POST /api/careers",
      "PUT /api/careers/:id",
      "DELETE /api/careers/:id",
    ],
  });
});

router.use("/careers", createCareerRouter({ careerRepository, handleError }));

module.exports = router;
