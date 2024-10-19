const mongoose = require('mongoose');
// csatlakozás az adatbázishoz

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Sikeres csatlakozás az adatbázishoz");
    } catch {
        console.log("Sikertelen csatlakozás az adatbázishoz", error.message);
    }
};

module.exports = connectDB;