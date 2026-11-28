const initialCareers = require("../data/careers.json");
const normalizeText = require("../utils/normalize-text.js");

class CareerMemoryRepository {
  // Administra el CRUD de las carreras de la UTAP.
  // Al iniciar carga las carreras de data/careers.json en un Map en memoria:
  // los cambios (crear, editar, eliminar) se pierden al reiniciar el servidor.
  // Los datos llegan ya validados por el middleware validateCareer.
  constructor(careers = initialCareers) {
    this.careers = new Map();
    this.nextId = 1;

    careers.forEach((career) => {
      this.careers.set(this.nextId, { id: this.nextId, ...career });
      this.nextId += 1;
    });
  }

  getAll() {
    return [...this.careers.values()];
  }

  // Convierte el ID recibido por la ruta (texto) a número para buscarlo en el Map.
  getById(id) {
    const career = this.careers.get(Number(id));

    if (!career) {
      throw this.notFoundError(id);
    }

    return career;
  }

  // Busca las carreras cuyo nombre contenga el texto recibido.
  // No distingue mayúsculas ni tildes: "gestion" encuentra "Gestión".
  getByName(name) {
    const search = normalizeText(name);
    return this.getAll().filter((career) =>
      normalizeText(career.nombre).includes(search),
    );
  }

  // Filtra por nivel de formación, por ejemplo "tecnologico".
  getByLevel(level) {
    const search = normalizeText(level);
    return this.getAll().filter(
      (career) => normalizeText(career.nivel) === search,
    );
  }

  // Asigna un ID y guarda la carrera.
  create(careerData) {
    const career = {
      ...careerData,
      id: this.nextId,
    };

    this.careers.set(this.nextId, career);
    this.nextId += 1;
    return career;
  }

  // PUT reemplaza los datos de la carrera existente, conservando su ID.
  update(id, careerData) {
    const numericId = Number(id);
    if (!this.careers.has(numericId)) {
      throw this.notFoundError(id);
    }

    const updatedCareer = {
      ...careerData,
      id: numericId,
    };

    this.careers.set(numericId, updatedCareer);
    return updatedCareer;
  }

  delete(id) {
    const numericId = Number(id);
    const career = this.careers.get(numericId);

    if (!career) {
      throw this.notFoundError(id);
    }

    this.careers.delete(numericId);
    return career;
  }

  notFoundError(id) {
    const error = new Error(`No existe una carrera con el id ${id}`);
    error.status = 404;
    return error;
  }
}

module.exports = CareerMemoryRepository;
