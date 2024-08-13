var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const response = await axios.get('http://localhost:3000/');
        console.log(response.data);
        res.render('index');
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
