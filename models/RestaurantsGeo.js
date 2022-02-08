//Schema.This Part is known as Schema.
const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    RestaurantName: { type: String, default: "" },
    location: { type: {type:String},
    coordinates: [Number]},
    PhoneNumber: {type: String, default: ""},
    Address: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    Status: { type: Boolean, default: true},
}, { collection: 'RestaurantsGeo', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
restaurantSchema.index({"location": "2dsphere"});
module.exports = mongoose.model('RestaurantsGeo', restaurantSchema);

