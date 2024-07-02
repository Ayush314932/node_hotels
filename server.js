    const express = require('express')
    const app = express();
    const db=require('./db');
    require('dotenv').config();

    const bodyParser=require('body-parser');
    app.use(bodyParser.json());// req body
    const PORT = process.env.PORT || 3000;
    
    const cors=require('cors');
    app.use(cors({origin:"*"}))

   
    const MenuItem = require('./models/MenuItem');

    app.get('/', function (req, res){
    res.send('Hello World welcome to our hotel ')
    })

    
        //Import router files
        const personRoutes = require('./routes/personRoutes');
        const menuItemRoutes = require('./routes/menuItemRoutes')
        //use the routers
        app.use('/person', personRoutes);
        app.use('/menu',menuItemRoutes);



    app.listen(PORT,()=>{
        console.log('listening on port 3000')
    })