require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL + process.env.DB_NAME
        );

        const migrator = require('./migrations/migrator');

        await migrator.backup();
        await migrator.migrate();

        console.log("Migration completed successfully");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err.message);
        process.exit(1);
    }
})();
