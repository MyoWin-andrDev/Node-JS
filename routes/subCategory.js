const router = require('express').Router();
const subController = require('../controllers/subController');

const {saveFile, deleteFile} = require('../utils/gallery');

router.get('/', subController.getAllCategory)
router.post('/', saveFile , subController.addSubCategory);
router.patch('/:id', saveFile , subController.updateSubCategory);

module.exports = router;