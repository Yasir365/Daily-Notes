const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
    return res.status(200).send({ message: "List Todo" });
});

router.post('/add', (req, res) => {
    return res.status(200).send({ message: "Add List Todo" });
});


module.exports = router;
