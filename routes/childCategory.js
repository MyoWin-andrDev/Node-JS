const router = require('express').Router();
const childCategoryController = require('../controllers/childController');
const {saveFile, deleteChildFile} = require('../utils/gallery');

router.get('/', childCategoryController.getAllChildCategory)
router.post('/', saveFile, childCategoryController.addChildCategory);
router.patch('/:id', saveFile, childCategoryController.updateChildCategory);
router.delete('/:id', deleteChildFile, childCategoryController.deleteChildCategory);

// router.route('/:id')
//     .get(childCategoryController.getAllChildCategory)
//     .post(childCategoryController.addChildCategory)
//     // .patch(childCategoryController.updateChildCategory)
//     // .delete(childCategoryController.deleteChildCategory)

module.exports = router