require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");



const PORT = process.env.PORT || 5001;



app.get("/", (req, res) => {
  res.send("Premium Service Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`User Service running on port ${PORT}`);
});