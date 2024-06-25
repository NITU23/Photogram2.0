const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://nitin:Nitin123@cluster0.xdpamow.mongodb.net/';

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error While Connecting Mongodb',error)
    }
}
connectDB();

module.exports = mongoose.connection;
