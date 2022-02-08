//This part is known as Schema.
const mongoose = require("mongoose");
const SaveApi = new mongoose.Schema({
    UserID: { type: String, default: "" },
    UserName: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'SaveApi', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('SaveApi', SaveApi);