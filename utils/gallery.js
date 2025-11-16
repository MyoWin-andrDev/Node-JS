
const fs = require('fs');

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

let deleteFile =  async (fileName) => {
    await fs.unlinkSync(`./uploads/${fileName}`)
}

module.exports = {
    saveFile, saveFiles, deleteFile
}