const fileSystem = require("fs");
const db = require('./db_collections')

const fs = require("fs/promises");

const writeFiles = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
};

const readFiles = async (file) => {
    return JSON.parse(await fs.readFile(file, "utf8"));
};

const storage = (file) => './migrations/backup/' + file + '.json'


let migrator = {
    async backup(collection, file) {
        const result = await collection.find().lean();
        await writeFiles(storage(file), result);
        console.log(file, "Backup Done");
    },

    async migrate(collection, file) {
        const filePath = storage(file);
        let data = await readFiles(filePath);

        data = data.map(({ _id, ...rest }) => rest);

        await collection.insertMany(data, { ordered: false });
        console.log(file, "Migrated");
    }
};


let backup = async() => {
    await migrator.backup( db.categoryDB, 'category')
    await migrator.backup( db.childCategoryDB, 'childCategory')
    await migrator.backup( db.subCategoryDB, 'subCategory')
    await migrator.backup( db.orderDB, 'order')
    await migrator.backup( db.orderItemDB, 'orderItem')
    await migrator.backup( db.permissionDB, 'permission')
    await migrator.backup( db.productDB, 'product')
    await migrator.backup( db.roleDB, 'role')
    await migrator.backup( db.tagDB, 'tag')
    await migrator.backup( db.userDB, 'user')

}

let migrate = async() => {
    await migrator.migrate( db.categoryDB, 'category')
    await migrator.migrate( db.childCategoryDB, 'childCategory')
    await migrator.migrate( db.subCategoryDB, 'subCategory')
    await migrator.migrate( db.orderDB, 'order')
    await migrator.migrate( db.orderItemDB, 'orderItem')
    await migrator.migrate( db.permissionDB, 'permission')
    await migrator.migrate( db.productDB, 'product')
    await migrator.migrate( db.roleDB, 'role')
    await migrator.migrate( db.tagDB, 'tag')
    await migrator.migrate( db.userDB, 'user')
}

module.exports = {
    backup,
    migrate
}