'use strict'

const BaseRepository = require('./repository')

class PrivilegeRepository extends BaseRepository {

  tableName = 'privileges'

  /**
   * 
   * @param {import('sqlite3').Database} db 
   */
  constructor (db, conf) {
    super(db, this.tableName, conf)
  }

  createTable () {
    return `
      CREATE TABLE ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
    `
  }

  /**
   * 
   * @param {object} param0 
   * @param {string} param0.name
   * @returns {Promise<{name: string}>}
   */
  add ({ name }) {
    assert.ok(name && typeof name === 'string', 'Name is a required string')
    return super.add({ name })
  }
}

module.exports = PrivilegeRepository
