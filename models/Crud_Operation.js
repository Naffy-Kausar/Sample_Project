//Schema.This Part is known as Schema.
const mongoose = require("mongoose");
const crudSchema = new mongoose.Schema({
    index: { type: String, default: "" },
    name: {type: String, default: ""},
    isActive: { type: Boolean, default: "" },
    registered: {type: String, default: ""},
    age: {type: String, default: ""},
    gender: { type: String, default: "" },
    eyeColor: { type: String, default: "" },
    favoriteFruit: { type: String, default: "" },
    company: {
        title: { type: String, default: "" }, 
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location:{
            country: { type: String, default: "" },
            address: { type: String, default: "" },
        }      
    },
    tags:[],
}, { collection: 'Crud_Operation', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
// CRUDSchema.index({"location": "2dsphere"});
module.exports = mongoose.model('Crud_Operation', crudSchema);


