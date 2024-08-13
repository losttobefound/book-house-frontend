var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET Meine Leihvorgänge page. */
router.get('/', async function (req, res, next) {
    try {
        // Fetch borrow records
        const response = await axios.get('http://localhost:3000/borrows'); // Corrected endpoint
        console.log(response.data);
        res.render('borrow', {borrows: response.data}); // Pass data to the view
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update borrow by id
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {userid, equipmentids, end} = req.body;

        const data = {
            userid,
            equipmentids,
            end
        };

        // Send PUT request to backend
        const response = await axios.put(`http://localhost:3000/borrow/${id}`, data);

        res.json(response.data); // Send back the response data from backend
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).send(`Borrow record not found: ${error.response.data}`);
        } else {
            next(error); // Pass other errors to the next error handler
        }
    }
});

module.exports = router;
