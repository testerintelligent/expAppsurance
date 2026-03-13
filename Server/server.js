// server.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const contactRoutes = require("./Routes/ContactRoute");
const accountRoutes = require("./Routes/AccountRoute");
const submissionRoutes = require("./Routes/SubmissionRoute");
const driverRoutes = require("./Routes/DriverRoute");
const vehicleRoutes = require("./Routes/VehicleRoute");
const quoteRoutes = require("./Routes/QuoteRoute");
const policyRoutes = require("./Routes/PolicyRoute");
const claimRoutes = require("./Routes/ClaimRoute");
const invoiceRoutes = require("./Routes/InvoiceRoute");
const authRoutes = require("./Routes/AuthRoute");

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Use main routes
app.use("/api/contacts", contactRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/billing", invoiceRoutes);
app.use("/api/register", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Contact Management API is running 🚀");
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
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://10.192.190.158:${PORT}`));
app.listen(PORT, () => console.log("SERVER RUNNING"));
