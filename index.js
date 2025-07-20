const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const {connectMySQL} = require('./db/connectDB');

connectMySQL();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files for admin and frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use('/admin', express.static(path.join(__dirname, './admin/dist')));
  app.use('/center', express.static(path.join(__dirname, './frontend/dist')));
}

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

app.use('/auth', authRoutes);
app.use('/api',studentRoutes)
app.use('/api/services', serviceRoutes);


app.listen(process.env.PORT || 3000, () => {
 if (process.env.NODE_ENV === 'production') {
    console.log(`Server running in production mode on port ${process.env.PORT || 3000}`);
    console.log(`Access the admin panel at: ${process.env.BASE_URL}/admin`);
    console.log(`Access the frontend at: ${process.env.BASE_URL}/center`);
  } else {
    console.log(`Server running in development mode on port ${process.env.PORT || 3000}`);
    console.log(`Access the server at: ${process.env.BASE_URL || 'http://localhost:3000'}`);
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Server!');
});
