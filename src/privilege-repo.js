'use strict'

const assert = require('assert')
const BaseRepository = require('./repository')

const tableName = 'privileges'

class PrivilegeRepository extends BaseRepository {

  /**
   * 
   * @param {import('sqlite3').Database} db 
   */
  constructor (db, conf) {
    super(db, tableName, conf)
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
