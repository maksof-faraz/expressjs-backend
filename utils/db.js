const mongoose = require('mongoose');
const URI = process.env.Mongdb_Url;
    
const connectDb = async()=>{
    try{
        await mongoose.connect(URI)
        console.log('connection successful to database');
    }catch(err){
        console.log('database connection failed');
        process.exit(0)
    }
}

module.exports = connectDb;