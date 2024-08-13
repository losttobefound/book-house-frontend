var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function (req, res, next) {
    axios.get('http://localhost:3000/users')
        .then(response => {
            // Render the 'users' view
            res.render('users');
        })
        .catch(error => {
            next(error);
        });
});

// Route to get user by name
router.get('/byName', async (req, res, next) => {
    try {
        const {username, password} = req.query;
        const response = await axios.get(`http://localhost:3000/users/byName`, {params: {username}});
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).send('User not found');
        } else {
            next(error);
        }
    }
});

// Route to register a user
router.post('/', async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const response = await axios.post('http://localhost:3000/users', {username, email, password});
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

