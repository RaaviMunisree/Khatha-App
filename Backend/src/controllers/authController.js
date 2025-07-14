const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator'); 

exports.register = async (req, res) => {
    const { name, mobile, password, role, shopName } = req.body;
    console.log(req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await User.findOne({ mobile, shopName });
        if (existingUser) {
            return res.status(409).json({ message: "User with this mobile and shop already exists" }); // 409 Conflict
        }
        console.log(req);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, mobile, password: hashedPassword, role, shopName });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        res.status(201).json({ // 201 Created for successful resource creation
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            shopName: user.shopName,
            token,
            message: "Registration successful" // Explicit success message
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' }); // More specific error message
    }
};

exports.login = async (req, res) => {
    const { mobile, password, shopName } = req.body;

    try {
        console.log({ mobile, password, shopName });
        const user = await User.findOne({ mobile, shopName });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // 401 Unauthorized
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // 401 Unauthorized
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            shopName: user.shopName,
            role:user.role,
            token,
            message: "Login successful" // Explicit success message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' }); // More specific error message
    }
};