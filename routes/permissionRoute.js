const router = require("express").Router();
const PermissionController = require("../controllers/permissionController");
const {validateBody} = require("../utils/validator")
const {PermissionSchema } = require("../utils/schema");


router.get('/', PermissionController.getAllPermissions)
router.get('/:id', PermissionController.getSinglePermission)
router.post('/', validateBody(PermissionSchema.add), PermissionController.add)
router.patch('/:id', validateBody(PermissionSchema.update), PermissionController.updatePermission)
router.delete('/:id', PermissionController.deletePermission)


module.exports = router;