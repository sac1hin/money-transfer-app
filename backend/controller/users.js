const User = require("../models/Users");
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const cleanRequestBody = require("../helper/cleanBody");
const Account = require("../models/Account");

module.exports.SignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        await Account.create({
            userId: newUser._id,
            balance: Math.floor(Math.random() * 10000) + 1
        })

        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({
            message: "User created successfully",
            token
        });

    } catch (e) {
        console.log(e);
        return res.status(400).json(e.message);
    }
}

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password')
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({ message: 'Login successful', token });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

module.exports.Profile = async (req, res) => {
    try {
        const profile = req.user;

        return res.status(200).json({ profile });
    } catch (e) {
        return res.status(400).send(e.message);
    }
};

module.exports.UpdateProfile = async (req, res) => {
    try {
        const data = cleanRequestBody(req.body);

        if (data && data.email) {
            const user = await User.findOne({ email: data.email });
            if (user && data.email != req.user.email) {
                throw new Error('Email already taken!')
            }
        }

        if (data && data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await User.updateOne({ _id: req.user.id }, { ...data, password: hashedPassword });
        } else {
            await User.updateOne({ _id: req.user.id }, { data });
        }

        return res.status(202).json("Updated successfully");
    } catch (e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
};

module.exports.FilterByName = async (req, res) => {
    try {
        const filter = req.query?.filter;

        const regex = new RegExp(filter, 'i');
        const users = await User.find({
            $or: [
                { firstName: { $regex: regex } },
                { lastName: { $regex: regex } }
            ]
        }).select('-password -email');


        return res.status(202).json({ users });
    } catch (e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
};