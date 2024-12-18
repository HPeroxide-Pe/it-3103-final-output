const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// If POST with role, register
// If not then proceed to login
exports.loginOrRegister = async (req, res) => {
    console.log(req.body);
    const { username, pass, email, role } = req.body;
    try {
        if (role) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // hashing password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(pass, salt);

            const newUser = new User({
                username,
                password: hashedPassword,
                email,
                role,
            });

            const savedUser = await newUser.save();
            return res.status(201).json({ message: 'User registered successfully', user: savedUser });
        } else {
            
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(pass, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // generate JWT token
            const token = jwt.sign(
                { id: user._id, username: user.username, role: user.role, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Login successful', token });
        }
    } catch (err) {
        console.error('Error in login or registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
};