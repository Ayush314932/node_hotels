const express = require('express');
const router = express.Router();

const MenuItem=require('./../models/MenuItem');


    //get method to get menu details 
    router.get('/', async (req,res)=>{
        try{
            const data = await MenuItem.find();
            console.log('data fetched');
            res.status(200).json(data);
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'internal server error'});
        }
    })
// post method to add new menu item
    router.post('/', async (req,res)=>{
        try{
            const data = req.body
            const newMenu = new MenuItem(data);
            const response = await newMenu.save();
            console.log('data saved');
            res.status(200).json(response);
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'internal server error'});
        }
    })

module.exports = router;