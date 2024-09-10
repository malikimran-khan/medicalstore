const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Tablet', 'Syrup', 'Injection', 'Capsule'],
    required: true,
  },
  dosage: {
    type: String,
    enum: ['100 mg', '250 mg', '500 mg', '1 g'],
    required: true,
  },
  manufacturer: {
    type: String,
    enum: ['Pfizer', 'Moderna', 'Johnson & Johnson', 'AstraZeneca'],
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Medicine', medicineSchema);
