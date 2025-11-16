require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const { saveFiles, deleteFile} = require("./utils/gallery");


app.use(bodyParser.json());
app.use(fileUpload());

app.post("/delete/:fileName",  (req, res) => {
    deleteFile(req.params.fileName)
    res.status(200).send({con : true, msg: "Deleted Successfully", result : req.body});
})

app.post("/upload", saveFiles, (req, res, next) => {
    res.status(200).send({result : req.body})
})

app.use((err, req, res,next) => {
    err.status = err.status || 404;
    res.status(err.status),send({con : false, msg : err.message});
})

app.use((req, res) => {
    res.status(404).send({ con: false, msg: "Not Route Found" });
})

app.listen(process.env.PORT, () => {console.log(`Running at Port ${process.env.PORT}`)})