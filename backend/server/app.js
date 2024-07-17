const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT = process.env.port || 3001 ;
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(cors({ origin: true,credentials: true,
    optionsSuccessStatus: 200 }));

app.use(express.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRouter = require("./routes/user");
const postRouter = require("./routes/post")
app.use("/api/user", userRouter);
app.use("/api/post",postRouter)
app.get('/',(req,res)=>
res.status(200).send('hello'))
async function startServer() {
    try {
        await mongoose.connect("mongodb+srv://nitin:Nitin123@cluster0.xdpamow.mongodb.net/");
        app.listen(PORT, () => {
            console.log(`Connected To Database and Listening To Port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();
