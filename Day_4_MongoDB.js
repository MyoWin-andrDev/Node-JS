
require('dotenv').config();
const mongoose = require('mongoose');
    express = require('express');
    bodyParser = require('body-parser');
    app = express();
    fileUpload = require('express-fileupload');

    mongoose.connect(process.env.MONGO_URL + process.env.DB_NAME);
const { Schema } = mongoose;
const CategorySchema = new Schema({
    name: {type: String, unique: true, required: true},
    image: {type: String, required: true},
})


app.use(express.json());
app.use(bodyParser.json());

app.use((err, req, res,next) => {
    err.status = err.status || 404;
    res.status(err.status),send({con : false, msg : err.message});
})

app.use((req, res) => {
    res.status(404).send({ con: false, msg: "Not Route Found" });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})