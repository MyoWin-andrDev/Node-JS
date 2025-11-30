const router = require('express').Router();
const subController = require('../controllers/subController');

const {saveFile, deleteFile, deleteSubFile} = require('../utils/gallery');

router.get('/', subController.getAllSubCategory)
router.get('/:id', subController.getSingleSubCategory)
router.post('/', saveFile , subController.addSubCategory);
router.patch('/:id', saveFile , subController.updateSubCategory);
router.delete('/:id', deleteSubFile , subController.deleteSubCategory);

//Another Method

// router.route('/:id')
//     .get(subController.getAllSubCategory)
//     .post(subController.addSubCategory)
//     .patch([saveFile, subController.updateSubCategory])
//     .delete([deleteSubFile, subController.deleteSubCategory]);

module.exports = router;