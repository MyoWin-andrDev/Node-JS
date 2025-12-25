const route = require('express').Router();
const controller = require('../controllers/controller');
const { saveFile, deleteFile} = require("../utils/gallery")

route.get('/:id', controller.getSingleItem)
route.post('/', saveFile, controller.addNewItem)
route.delete('/:id', deleteFile, controller.deleteItem)
route.patch('/:id', controller.updateItem)

module.exports = route