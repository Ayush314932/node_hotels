const mongoose=require('mongoose');
//define mongodb URL Connection
const mongoURL='mongodb://localhost:27017/hotels' // replace my database with your database name
mongoose.connect(mongoURL,{
    useNewURLParser: true,
    useUnifiedTopology: true,
})
//get the default connection 
//mongooose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;
//define the event listeners for database conneciton

db.on('connected',()=>{
    console.log('connected to mongodb server')
});
// event listeners for error
db.on('error',(err)=>{
    console.log('error in database connection',err)
});
//event listeners for disconnected
db.on('disconnected',()=>{
    console.log('mongodb disconnected')
});

//Export the database connection
module.exports=db;