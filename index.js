const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index.js");

const server = express();

// Morgan muestra cada petición en la terminal (método, ruta, código y tiempo).
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

// Todas las rutas de la API quedan agrupadas bajo /api.
server.use("/api", router);

if (require.main === module) {
  server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/api");
  });
}

module.exports = server;
