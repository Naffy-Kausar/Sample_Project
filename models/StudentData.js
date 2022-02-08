//Schema.This Part is known as Schema.
const mongoose = require("mongoose");
const StudentData = new mongoose.Schema({
    StudentID: { type: String, default: "" },
    StudentName: { type: String, default: "" },
    StudentCollege: { type: String, default: "" },
    StudentPhone: { type: String, default: "" },
    StudentEmailID: { type: String, default: "" },
    StudentStatus: { type: String, default: "" },
    PasswordHash: { type: String, default: "" },
    PasswordSalt: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'StudentData', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('StudentData', StudentData);