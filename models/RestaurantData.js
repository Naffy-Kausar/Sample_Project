//Schema.This Part is known as Schema.
const mongoose = require("mongoose");
const RestaurantData = new mongoose.Schema({
    RestaurantID: { type: String, default: "" },
    RestaurantName: { type: String, default: "" },
    RestaurantAddress: { type: String, default: "" },
    RestaurantLatitude: { type: String, default: "" },
    RestaurantLongitude: { type: String, default: "" },
    Status: { type: Boolean, default: true },
}, { collection: 'RestaurantData', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('RestaurantData', RestaurantData);