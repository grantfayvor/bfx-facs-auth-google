'use strict'

const BaseRepository = require('./repository')

class AdminPrivilegeRepository extends BaseRepository {

  tableName = 'admin_privileges'

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
        admin_id INTEGER NOT NULL,
        privilege_id INTEGER NOT NULL,

        PRIMARY KEY (admin_id, privilege_id),

        FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
        FOREIGN KEY (privilege_id) REFERENCES privileges(id) ON DELETE CASCADE
      );
    `
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
    return super.add({ adminId, privilegeId })
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
}

module.exports = AdminPrivilegeRepository
