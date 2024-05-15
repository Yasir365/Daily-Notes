const User = require('../models/user.model');
const verifySchema = require('../validators/validate');
const schema = require('../validators/schema.json');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const verifyReq = verifySchema(schema.register, req.body);
    if (!verifyReq.success) {
        return res.status(400).send(verifyReq.message);
    }

    const { name, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    const verifyReq = verifySchema(schema.login, req.body);
    if (!verifyReq.success) {
        return res.status(201).send(verifyReq.message);
    }
    res.json(await validate_user(req.body));

    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Return success response
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, register };
