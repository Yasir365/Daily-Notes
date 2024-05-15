const User = require('../models/user.model');
const verifySchema = require('../validators/validate');
const schema = require('../validators/schema.json');
const bcrypt = require('bcrypt');
const {generateToken} = require('../middlewares/jwt.service')

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
        return res.status(400).send(verifyReq.message);
    }

    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect Email or Password' });
        }

        // Exclude password field from user data
        const userData = { ...user.toObject() };
        delete userData.password;

        // Generate JWT token
        const token = generateToken(userData)

        // Return user data without the password along with the token
        return res.status(200).json({
            message: 'Login successful',
            data: userData,
            token: token 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { login, register };
