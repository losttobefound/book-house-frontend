var express = require('express');
var router = express.Router();
var axios = require('axios');

let borrowedItems = [];

// Route to get borrowed items and render the equipment page
router.get('/', (req, res, next) => {
    res.render('equipment', {borrowedItems: borrowedItems});
});

// Route to add an item to the borrowed list
router.post('/', async (req, res, next) => {
    try {
        const newItem = req.body;

        if (!newItem.articlenumber || !newItem.title || !newItem.description || !newItem.count || !newItem.userid) {
            return res.status(400).json({error: 'All fields are required.'});
        }

        newItem.articlenumber = parseInt(newItem.articlenumber, 10);
        newItem.count = parseInt(newItem.count, 10);
        newItem.userid = parseInt(newItem.userid, 10);

        borrowedItems.push(newItem);

        const response = await axios.post('http://localhost:3000/equipment', newItem);

        if (response.status === 201) {
            res.json(newItem);
        } else {
            res.status(response.status).json(response.data);
        }
    } catch (error) {
        console.error('Error borrowing item:', error);
        next(error);
    }
});


module.exports = router;
