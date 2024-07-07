const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
//const { age } = require('../notes');

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
        enum: ['Chef','manager','owner'],
        required:true
    },
    mobile:{
        type: Number,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
      },
    address:{
        type:String,
    },
    salary:{
        type:Number,
    },
    username:{
        required: true,
        type:String,
    },
    password:{
        required: true,
        type: String
    }

});

personSchema.pre('save',async function(next){
    const person=this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();


    try{
        //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
       
        
        //Override the plain password with the hashed one 
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
//use bcrypt to compare the provided password with the hashed password 
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//Create person model
const Person = mongoose.model('person',personSchema);
module.exports=Person;