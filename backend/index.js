require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');

const cors = require('cors')
const tripRoutes = require('./routes/tripRoutes');
const app = express();
const userRoutes = require('./routes/userRoutes');



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true}))
app.use(express.json());
app.use(cookieParser());

// Static folder for profile images
app.use('/uploads/profileImages', express.static(path.join(__dirname, 'uploads', 'profileImages')));


// Routes
app.use('/api/trip', tripRoutes);
app.use('/api/users', userRoutes);



// Error handling (basic)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb://127.0.0.1:27017/travelplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error(err.message);
  process.exit(1);
});