const mongoose =  require("mongoose");

const CONN_URL = 'mongodb+srv://lextechspec:lexiz@cluster.undmq.mongodb.net/memoriesapp?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        await mongoose.connect(CONN_URL)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB
