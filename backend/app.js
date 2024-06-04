const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
const PORT = 3001; 
const bodyParser = require('body-parser');
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
const auth = require('./middlewares/authorization')
const router = require("./routes/user");
app.use("/api/user", router);

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
