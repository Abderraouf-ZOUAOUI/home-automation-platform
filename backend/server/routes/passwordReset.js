
// passwordReset.js (routes)
const express = require('express');
const EmployeeModel = require('../model/Employee');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post("/verify-name", async (req, res) => {
    try {
        const user = await EmployeeModel.findOne({ 
            firstName: { $regex: new RegExp(`^${req.body.firstName}$`, 'i') },
            lastName: { $regex: new RegExp(`^${req.body.lastName}$`, 'i') }
        });
        
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { firstName, lastName, newPassword } = req.body;
        const user = await EmployeeModel.findOne({ 
            firstName: { $regex: new RegExp(`^${firstName}$`, 'i') },
            lastName: { $regex: new RegExp(`^${lastName}$`, 'i') }
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await EmployeeModel.findByIdAndUpdate(
            user._id,
            { password: hashedPassword }
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;