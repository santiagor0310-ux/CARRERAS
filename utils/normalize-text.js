/**
 * Pasa el texto a minúsculas y le quita las tildes para poder compararlo.
 * Ejemplo: "Gestión" -> "gestion"
 * @param {string} text
 * @returns {string}
 */
function normalizeText(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

module.exports = normalizeText;
