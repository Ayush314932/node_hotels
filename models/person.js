const mongoose=require('mongoose');
const { age } = require('../notes');

//define the person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    work:{
        type: String,
        enum: ['chef','manager','owner'],
        required:true
    },
    mobile:{
        type: Number,
        required:true
    },
    Email: {
        type: String,
        unique: true,
        sparse: true
      },
    address:{
        type:String,
    },
    salary:{
        type:Number,
    }

})
//Create person model
const Person = mongoose.model('person',personSchema);
module.exports=Person;