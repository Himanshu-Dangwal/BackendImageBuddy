const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');
const axios = require("axios")

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5050

const PORT = process.env.PORT

// const dbUrl = process.env.DB_URL || process.env.MONGODB_URI
// const dbUrl = process.env.dbUrl
const dbUrl = process.env.DB_URL

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

mongoose
    .connect(dbUrl)
    .then(() => {
        app.listen(PORT, () => {
            console.log(dbUrl);
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));


app.get("/", (req, res) => {
    res.send("This is Image Buddy Application");
})

setInterval(() => {
    axios.get('https://backendimagebuddy.onrender.com/')
        .then(response => {
            console.log('Pinged backend to keep it alive.');
        })
        .catch(error => {
            console.error('Error pinging backend:', error);
        });
}, 2 * 60 * 1000);