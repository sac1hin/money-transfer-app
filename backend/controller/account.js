const User = require("../models/Users");
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const cleanRequestBody = require("../helper/cleanBody");
const Account = require("../models/Account");
const mongoose = require('mongoose')

module.exports.Balance = async (req, res) => {
    try {
        const userId = req.user._id;

        const balanceDocument = await Account.findOne({ userId });

        if (!balanceDocument) {
            return res.status(404).json({ error: 'Account not found for the user' });
        }

        const userBalance = balanceDocument.balance;

        return res.status(200).json({ balance: userBalance });
    } catch (e) {
        return res.status(400).send(e.message);
    }
};

module.exports.Transfer = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const userId = req.user._id;
        const { to, amount } = req.body;

        const toUser = await Account.findOne({ userId: to }).session(session);
        if (!toUser) {
            throw new Error('Invalid account');
        }

        const balanceDocument = await Account.findOne({ userId }).session(session)
        if (!balanceDocument || balanceDocument.balance < amount) {
            throw new Error('Insufficient balance');
        }

        await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        return res.status(200).json({
            message: "Transfer successful"
        });
    } catch (e) {
        await session.abortTransaction();
        return res.status(400).send({
            message: e.message
        });
    } finally {
        session.endSession();
    }
};