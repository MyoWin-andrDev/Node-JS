const router = require("express").Router();
const PermissionController = require("../controllers/permissionController");
const {validateBody} = require("../utils/validator")
const {PermissionSchema } = require("../utils/schema");

router.post('/', validateBody(PermissionSchema.add), PermissionController.add)

module.exports = router;