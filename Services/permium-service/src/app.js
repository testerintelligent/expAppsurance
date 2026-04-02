const express = require("express");
const cors = require("cors");

//Routes
const rateTableRoutes = require("./Routes/rateTableRoutes")
const rateRoutineRoutes = require("./Routes/rateRoutineRoutes")
const rateBookRoutes = require("./Routes/rateBookRoutes")
const pricingRoutes = require("./Routes/pricingRoutes")
///////

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ratetable", rateTableRoutes);
app.use("/api/rateroutine", rateRoutineRoutes);
app.use("/api/ratebook", rateBookRoutes);
app.use("/api/pricing", pricingRoutes);

module.exports = app;