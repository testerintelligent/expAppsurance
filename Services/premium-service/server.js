require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");



const PORT = process.env.PORT || 5001;



app.get("/", (req, res) => {
  res.send("Premium Service Running");
});

// MongoDB Connection
connectDB();


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`User Service running on port ${PORT}`);
});