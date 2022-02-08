//Schema.This Part is known as Schema.
const mongoose = require("mongoose");
const Admins = new mongoose.Schema({
    AdminID: { type: String, default: "" },
    SessionID: { type: String, default: "" },
    Name: { type: String, default: "" },
    Designation: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    PasswordHash: { type: String, default: "" },
    PasswordSalt: { type: String, default: "" },
    Roles: {
        Whether_Admin_Section: { type: Boolean, default: false },
    },
    Status: { type: Boolean, default: true },
}, { collection: 'Admins', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Admins', Admins);