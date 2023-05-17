const express = require('express');
const colors = require("colors");
const zxcvbn = require("zxcvbn");
const app = express();
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv");

app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");

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
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});