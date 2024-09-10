const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const apiRoutes = require('./routes/FormApi');
const medicineRoutes = require('./routes/MedicineApi')
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost:27017/medicalstore", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.use('/forms', apiRoutes);
    app.use('/medicine' , medicineRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error); 
  })
  .finally(() => {
    console.log("MongoDB setup server complete");
  });