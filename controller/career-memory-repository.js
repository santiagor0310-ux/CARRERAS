const initialCareers = require("../data/careers.json");

class CareerMemoryRepository {
  // Administra el CRUD de las carreras de la UTAP.
  // Al iniciar carga las carreras de data/careers.json en un Map en memoria:
  // los cambios (crear, editar, eliminar) se pierden al reiniciar el servidor.
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
    const search = this.normalize(name);
    return this.getAll().filter((career) =>
      this.normalize(career.nombre).includes(search),
    );
  }

  // Filtra por nivel de formación, por ejemplo "tecnologico".
  getByLevel(level) {
    const search = this.normalize(level);
    return this.getAll().filter(
      (career) => this.normalize(career.nivel) === search,
    );
  }

  // Valida los datos, asigna un ID y guarda la carrera.
  create(careerData) {
    this.validateCareer(careerData);

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
    this.validateCareer(careerData);

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

  // Rechaza datos inválidos antes de modificar el almacenamiento.
  // Una carrera debe tener por lo menos "nombre" y "nivel".
  validateCareer(careerData) {
    if (
      !careerData ||
      typeof careerData !== "object" ||
      Array.isArray(careerData) ||
      typeof careerData.nombre !== "string" ||
      careerData.nombre.trim() === "" ||
      typeof careerData.nivel !== "string" ||
      careerData.nivel.trim() === ""
    ) {
      const error = new Error(
        "La carrera debe tener un nombre y un nivel que no estén vacíos",
      );
      error.status = 400;
      throw error;
    }
  }

  // Pasa el texto a minúsculas y le quita las tildes para comparar.
  normalize(text) {
    return String(text)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  notFoundError(id) {
    const error = new Error(`No existe una carrera con el id ${id}`);
    error.status = 404;
    return error;
  }
}

module.exports = CareerMemoryRepository;
