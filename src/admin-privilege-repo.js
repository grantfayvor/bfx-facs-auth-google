'use strict'

const assert = require('assert')
const BaseRepository = require('./repository')

const tableName = 'admin_privileges'

class AdminPrivilegeRepository extends BaseRepository {

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
   * @param {number} param0.adminId 
   * @param {number} param0.privilegeId 
   * @returns {Promise<{adminId, privilegeId}>}
   */
  add ({ adminId, privilegeId }) {
    assert.ok(adminId && typeof adminId === 'number', 'Admin ID is a required Integer')
    assert.ok(privilegeId && typeof privilegeId === 'number', 'Privilege ID is a required Integer')
    return super.add({ admin_id: adminId, privilege_id: privilegeId })
  }

  /**
   * 
   * @param {number} adminId 
   * @param {number} privilegeId 
   * @returns {Promise<object>}
   */
  findAdminPrivilege (adminId, privilegeId) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE admin_id=? AND privilege_id=?`,
        [adminId, privilegeId],
        function (err, row) {
          if (err) return reject(err)
          
          return resolve(row)
        }
      )
    })
  }

  getAdminPrivileges (adminId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.id, p.name
        FROM admin_privileges ap
        JOIN privileges p ON p.id = ap.privilege_id
        WHERE ap.admin_id = ?;
      `
      this.db.all(query, [adminId], function (err, rows) {
        if (err) return reject(err)
        return resolve(rows)
      })
    })
  }
}

module.exports = AdminPrivilegeRepository
