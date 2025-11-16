const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send({ con: true, msg: "Passed" });
});

let output = (req, res, next) => {
    console.log("This is the output")
    next()
}

let input = (req, res, next) => {
    console.log("This is the input")
    next()
}

app.use("/cat", output, input , (req, res,next) => {
    next(new Error("This is the custom Error!!!"))
   // res.status(200).send({ con: true, msg: "This is the special output" });
})

app.use((err,req,res,next) => {
    err.status = err.status || 404;
    res.status(err.status).send({con : false, msg : err.message});
})

// Catch-all for unmatched routes
app.use((req, res) => {
    res.status(404).send({ con: false, msg: "Not Found" });
});

app.listen(3000, () => {
    console.log("Port 3000");
});
