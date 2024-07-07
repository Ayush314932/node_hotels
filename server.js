    const express = require('express')
    const app = express();
    const db=require('./db');
    require('dotenv').config();
    const passport=require('./auth');
    const bodyParser=require('body-parser');
    app.use(bodyParser.json());// req body
    const PORT = process.env.PORT || 3000;

    //middleware function
    const  logRequest = (req,res, next) => {
        console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
        next();// move on to next phase
    }
    
    app.use(logRequest);//shows timing of logs in server
  
  
    app.use(passport.initialize());

    const localAuthMiddleware = passport.authenticate('local',{session: false})

    app.get('/',function(req,res){
        res.send('welcome to our Hotel')
    })
   
    // const MenuItem = require('./models/MenuItem');

    // app.get('/', logRequest,passport.authenticate('local',{session: false}) ,function (req, res){
    // res.send('Hello World welcome to our hotel ')
    // })

    
        //Import router files
        const personRoutes = require('./routes/personRoutes');
        const menuItemRoutes = require('./routes/menuItemRoutes')
        //use the routers
        app.use('/person',personRoutes);
        app.use('/menu', menuItemRoutes);



    app.listen(PORT,()=>{
        console.log('listening on port 3000')
    })