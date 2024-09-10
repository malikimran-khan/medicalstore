const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    cnic: { type: String, required: true },
    password: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    gender: { type: String, required: true },
    languages: { type: [String], required: true },
    address: { type: String, required: true },
    picture: { type: String }, 
    
});

module.exports = mongoose.model('User', UserSchema);
