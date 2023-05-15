const express = require('express');
const colors = require("colors");
const zxcvbn = require("zxcvbn");
const app = express();
const connectDb = require("./config/connectDb");
const usersRoute = require('./routes/usersRoute');
const dotenv = require("dotenv");

app.use(express.json());


app.use('/api/users', usersRoute);


//dotenv conig
dotenv.config();
connectDb();

//port
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});