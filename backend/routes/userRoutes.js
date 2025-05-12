// routes/usersRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/db'); // Assuming this is the path to your user model
const authenticate = require('../middleware/authMiddleware');


// Endpoint 1: Get all users sorted by total questions solved (descending)
router.get('/all', async (req, res) => {
    try {
        const users = await User.find().sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Error fetching all users.');
    }
});


//for SE
router.get('/class/SE', async (req, res) => {
    try {
        const users = await User.find({ class: 'SE' }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class SE:', error);
        res.status(500).send('Error fetching users for class SE.');
    }
});

//for SE 9
router.get('/class/SE/9', async (req, res) => {
    try {
        const users = await User.find({ class: 'SE', div: 9 }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class SE9:', error);
        res.status(500).send('Error fetching users for class SE9.');
    }
});

//for SE 10
router.get('/class/SE/10', async (req, res) => {
    try {
        const users = await User.find({ class: 'SE', div: 10 }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class SE10:', error);
        res.status(500).send('Error fetching users for class SE10.');
    }
});

//for SE 11
router.get('/class/SE/11', async (req, res) => {
    try {
        const users = await User.find({ class: 'SE', div: 11 }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class SE11:', error);
        res.status(500).send('Error fetching users for class SE11.');
    }
});


// Endpoint 2: Get users for class 'TE' sorted by total questions solved (descending)
router.get('/class/TE', async (req, res) => {
    try {
        const users = await User.find({ class: 'TE' }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class TE:', error);
        res.status(500).send('Error fetching users for class TE.');
    }
});

// Endpoint 3: Get users for class 'TE' and div '9' sorted by total questions solved (descending)
router.get('/class/TE/9', async (req, res) => {
    try {
        const users = await User.find({ class: 'TE', div: 9 }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class TE div 9:', error);
        res.status(500).send('Error fetching users for class TE div 9.');
    }
});

//for TE10
router.get('/class/TE/10', async (req, res) => {
    try {
        const users = await User.find({ class: 'TE', div: 10 }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class TE div 10:', error);
        res.status(500).send('Error fetching users for class TE div 10.');
    }
});

//for TE11
router.get('/class/TE/11', async (req, res) => {
    try {
        const users = await User.find({ class: 'TE', div: 11 }).sort({ totalSolved: -1 });
        res.json({ data: users });
    } catch (error) {
        console.error('Error fetching users for class TE div 11:', error);
        res.status(500).send('Error fetching users for class TE div 11.');
    }
});

module.exports = router;
