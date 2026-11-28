const express = require("express");
const router = express.Router();

const CareerMemoryRepository = require("../controller/career-memory-repository.js");
const createCareerRouter = require("./careers.js");
const validateCareer = require("../middleware/validate-career.js");

// Una sola instancia guarda las carreras mientras el servidor esté encendido.
const careerRepository = new CareerMemoryRepository();

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

// Antes de llegar al router de carreras pasa por el middleware validateCareer.
router.use("/careers", validateCareer, createCareerRouter({ careerRepository }));

module.exports = router;
