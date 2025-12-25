
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
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.json());


const CategoryRoute = require("./routes/category");
const SubCategoryRoute = require("./routes/subCategory");
const childCategoryRoute = require("./routes/childCategory");
const tagRouter = require("./routes/tagRoute");
const permissionRouter = require("./routes/permissionRoute");
const roleRouter = require("./routes/roleRoute");
const userRouter = require("./routes/userRoute");
const authApi = require("./routes/apiRoute")
const productRouter = require('./routes/productRoute')

let { validateToken } = require('./utils/validator')

app.use("/category" , validateToken(), CategoryRoute);
app.use("/subCategory", validateToken() ,SubCategoryRoute);
app.use("/childCategory", validateToken(), childCategoryRoute)
app.use("/tag", tagRouter);
app.use("/permissions", permissionRouter);
app.use('/role', roleRouter);
app.use('/user', validateToken(), userRouter);
app.use('/api', authApi)
app.use('/product', validateToken(), productRouter);

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