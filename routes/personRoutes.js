const express = require('express');
const router = express.Router();

const Person = require('../models/person');

// post route to add person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // assuming the request body contains the person data

        // Create a new person document using the Mongoose model
        const newPerson = new Person(data);

        // save the new person to the database
        const savePerson = await newPerson.save();
        console.log('data saved');
        res.status(200).json(savePerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched ');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type form the URL parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid syntax' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
});

// complete structure of update method;
router.put('/:id', async (req, res) => {
    try {
        const personID = req.params.id; // extract the id from the URL parameter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personID, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // Run mongoose validation
        });

        if (!response) {
            return res.status(400).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personID = req.params.id;

        const response = await Person.findByIdAndDelete(personID);
        if (!response) {
            return res.status(400).json({ error: 'Person not found' });
        }
        console.log('data deleted');
        res.status(200).json({ message: 'person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
});

module.exports = router; // important for exporting router























    
