module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('profileentities').updateMany(
      { profileImg: { $exists: false} }, 
      {$set: { profileImg: '' } }
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('profileentities').updateMany(
      {},
      { $unset: { profileImg: "" } }
    )
  }
};
