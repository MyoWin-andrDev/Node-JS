
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

const CategoryRoute = require("./routes/category");
const SubCategoryRoute = require("./routes/subCategory");

app.use("/category", CategoryRoute);
app.use("/subCategory", SubCategoryRoute);

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