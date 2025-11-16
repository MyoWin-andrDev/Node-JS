
require('dotenv').config();
//Require
const mongoose = require('mongoose');
    express = require('express');
    bodyParser = require('body-parser');
    app = express();
    fileUpload = require('express-fileupload');
const {saveFile} = require("./utils/gallery");
//Usage
mongoose.connect(process.env.MONGO_URL + process.env.DB_NAME);
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

//Schema
const { Schema } = mongoose;
const CategorySchema = new Schema({
    name: {type: String, unique: true, required: true},
    image: {type: String, required: true},
    createdAt : {type : Date, default :  Date.now()}
})

const Category = mongoose.model("category", CategorySchema);

app.post("/category", saveFile , async (req, res,next) => {
    let saveCategory = new Category(req.body);
    let result = await saveCategory.save();
    res.status(200).json({
        con : true,
        msg : "Category Created",
        result : result
    });
})

app.get("/category", async (req, res) => {
    let category = await Category.find();
    res.status(200).json({
        con : true,
        msg : "All Categories",
        result : category
    })
})


app.use((err, req, res,next) => {
    err.status = err.status || 404;
    res.status(err.status).send({con : false, msg : err.message});
})

app.use((req, res) => {
    res.status(404).send({ con: false, msg: "Not Route Found" });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})