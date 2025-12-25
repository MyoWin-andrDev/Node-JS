const router = require("express").Router();
const controller = require('../controllers/tagController');
const {saveFile } = require('../utils/gallery');
const {TagSchema, AllSchema} = require('../utils/schema');
const {validateBody, validateParams} = require('../utils/validator');

router.get('/:id',validateParams(AllSchema.id, 'id') , controller.getSingleTag)
router.post('/', saveFile, validateBody(TagSchema.add), controller.addTag)
router.patch('/:id',saveFile, validateBody(TagSchema.update), controller.updateTag)
router.delete('/:id', controller.deleteTag)

module.exports = router