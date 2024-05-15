const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    return res.status(200).send({ message: "Login" });
});

router.post('/register', (req, res) => {
    return res.status(200).send({ message: "Register" });
});

module.exports = router;
