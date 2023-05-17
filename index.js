const express = require('express');
const colors = require("colors");
const zxcvbn = require("zxcvbn");
const app = express();
const connectDb = require("./server/config/connectDb");
const dotenv = require("dotenv");

app.use(express.json());

const usersRoute = require("./server/routes/usersRoute");
const inventoryRoute = require("./server/routes/inventoryRoute");
const dashboardRoute = require("./server/routes/dashboardRoute");

app.use("/api/users", usersRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/dashboard", dashboardRoute);


//dotenv conig
dotenv.config();
connectDb();

//port
const PORT = process.env.PORT || 4001;

// deployment config
const path = require("path");

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});