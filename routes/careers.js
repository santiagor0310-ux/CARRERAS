const express = require("express");

/**
 * Crea un router para manejar las rutas de las carreras de la UTAP.
 * Si el repositorio lanza un error (por ejemplo 404), Express lo envía
 * automáticamente al middleware errorHandler.
 * @param {Object} options - Opciones para configurar el router.
 * @param {Object} options.careerRepository - Repositorio que maneja las carreras en memoria.
 * @returns {Object} - Router configurado.
 */
function createCareerRouter({ careerRepository }) {
  const router = express.Router();

  // GET /careers devuelve todas las carreras.
  router.get("/", (_req, res) => {
    res.json(careerRepository.getAll());
  });

  // Las rutas con texto fijo (nombre, nivel) van antes de /:id
  // para que Express no confunda "nombre" con un ID.
  router.get("/nombre/:nombre", (req, res) => {
    res.json(careerRepository.getByName(req.params.nombre));
  });

  router.get("/nivel/:nivel", (req, res) => {
    res.json(careerRepository.getByLevel(req.params.nivel));
  });

  // El parámetro :id se obtiene desde req.params.id.
  router.get("/:id", (req, res) => {
    res.json(careerRepository.getById(req.params.id));
  });

  // POST /careers crea una carrera. Recibe por body un objeto JSON con sus datos.
  router.post("/", (req, res) => {
    res.status(201).json(careerRepository.create(req.body));
  });

  // PUT /careers/:id reemplaza los datos de una carrera existente.
  router.put("/:id", (req, res) => {
    res.json(careerRepository.update(req.params.id, req.body));
  });

  // DELETE /careers/:id elimina una carrera y devuelve la que se eliminó.
  router.delete("/:id", (req, res) => {
    res.json(careerRepository.delete(req.params.id));
  });

  return router;
}

module.exports = createCareerRouter;
