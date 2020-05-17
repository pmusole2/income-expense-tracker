const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', res => res.json({ msg: 'Welcome to my App' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/account', require('./routes/account'));
app.use('/api/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
