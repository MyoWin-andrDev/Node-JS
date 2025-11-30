
const fs = require('fs');
const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subCategoryModel');
const ChildCategoryModel = require('../models/childCategoryModel');

let saveFile = (req, res, next) => {
    let fileName = new Date().valueOf() + "_" + req.files.file.name;
    req.files.file.mv("./uploads/" + fileName);
    req.body["image"] = fileName;
    console.log(fileName);
    console.log(req.body);
    next()
}


let saveFiles = (req, res, next) => {
    let fileArray = []
    req.files.files.forEach((file) => {
        let fileName = new Date().valueOf() + "_" + file.name;
        fileArray.push(fileName);
        file.mv("./uploads/" + fileName);
    })
    req.body["images"] = fileArray;
    console.log(req.body);

    next()
}


let deleteFile =  async (req, res , next) => {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ conn: false, msg: "Category not found" });
    }

    if (category.image) {
        await fs.unlinkSync(`./uploads/${category.image}`);
        console.log(`File ${category.image} deleted successfully`);
    }
    next()

}

let deleteSubFile =  async (req, res , next) => {
    const category = await SubCategoryModel.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ conn: false, msg: "SubCategory not found" });
    }

    if (category.image) {
        await fs.unlinkSync(`./uploads/${category.image}`);
        console.log(`File ${category.image} deleted successfully`);
    }
    next()

}

let deleteChildFile = async (req, res, next) => {
    const category = await ChildCategoryModel.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ conn: false, msg: "ChildCategory not found" });
    }

    if (category.image) {
        await fs.unlinkSync(`./uploads/${category.image}`);
        console.log(`File ${category.image} deleted successfully`);
    }
    next()
}

module.exports = {
    saveFile, saveFiles, deleteFile, deleteSubFile, deleteChildFile
}