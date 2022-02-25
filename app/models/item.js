const client = require('../config/postgres');
// const { ApiError } = require('../helpers/errorHandler');

/**
 * @typedef {object} Item
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} label - label of item
 */
/**
 * @typedef {object} InputItem
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} label - label of item
 */

module.exports = {
  /**
   * Récupère tout sans filtre ni ordre
   * @returns {Item[]} - Tous les items dans la base de donnée
   */
  async findAll() {
    const result = await client.query('SELECT * FROM "item"');
    return result.rows;
  },

  /**
   * Récupère par son id
   * @param {number} itemId - L'id de la item souhaitée
   * @returns {(Item|undefined)} - La Item souhaitée ou undefined si aucune Item à cet id
   */
  async findByPk(itemId) {
    const result = await client.query('SELECT * FROM "item" WHERE id = $1', [itemId]);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  },
  /**
   * Récupère par son label
   * @param {number} itemLabel - Le label de l'item souhaitée
   * @returns {(Item|undefined)} - L'Item souhaitée ou undefined si aucune Item à ce label
   */
  async findByLabel(itemLabel) {
    const result = await client.query(`SELECT * FROM item WHERE label = '${itemLabel}';`);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  },
  /**
   * Ajoute dans la base de données
   * @param {InputItem} item - Les données à insérer
   * @returns {Item} - Le Post inséré
   */
  async insert(item) {
    const savedPost = await client.query(`INSERT INTO item(label) VALUES('${item.label}');`);

    return savedPost.rows[0];
  },
};
