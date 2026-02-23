module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('profileentities').updateOne(
      { userId: "6973890da6f7a161b23f97c5" },
      { $set: { profileImg: "https://res.cloudinary.com/de7kgkvgt/image/upload/employee.webp" } }
    );

    await db.collection('profileentities').updateOne(
      { userId: "6973890da6f7a161b23f97c6" },
      { $set: { profileImg: "https://res.cloudinary.com/de7kgkvgt/image/upload/manager.webp" } }
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('profileentities').updateOne(
      { userId: "6973890da6f7a161b23f97c5" },
      { $unset: { profileImg: "" } }
    );

    await db.collection('profileentities').updateOne(
      { userId: "6973890da6f7a161b23f97c6" },
      { $unset: { profileImg: "" } }
    );
  }
};
