const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const {connectMySQL} = require('./db/connectDB');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

connectMySQL();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/api',studentRoutes)
app.use('/api/services', serviceRoutes);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
