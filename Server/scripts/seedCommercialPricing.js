// Adds Commercial Auto pricing to the rating data used by the pricing service.
//
//   cd Server
//   node scripts/seedCommercialPricing.js            (uses .env.development)
//   NODE_ENV=production node scripts/seedCommercialPricing.js
//
// Safe to run more than once — existing entries are left untouched.
//  • RT_BASE_PREMIUM gets a COMMERCIAL_AUTO row (baseRate 2500)
//  • a COMMERCIAL_AUTO rate book is created with the same tables, routines and
//    validity window as the PERSONAL_AUTO rate book
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({
  path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV || "development"}`),
});

const COMMERCIAL_BASE_RATE = 2500;

(async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set");
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  const rateTables = db.collection("ratetables");
  const rateBooks = db.collection("ratebooks");

  // 1. Base rate
  const base = await rateTables.findOne({ name: "RT_BASE_PREMIUM" });
  if (!base) throw new Error("RT_BASE_PREMIUM rate table not found");
  if (base.data.some((r) => r.key === "COMMERCIAL_AUTO")) {
    console.log("RT_BASE_PREMIUM already has COMMERCIAL_AUTO — skipped");
  } else {
    await rateTables.updateOne(
      { name: "RT_BASE_PREMIUM" },
      { $push: { data: { key: "COMMERCIAL_AUTO", baseRate: COMMERCIAL_BASE_RATE } } }
    );
    console.log(`Added COMMERCIAL_AUTO base rate ${COMMERCIAL_BASE_RATE}`);
  }

  // 2. Rate book (copied from Personal Auto)
  if (await rateBooks.findOne({ product: "COMMERCIAL_AUTO" })) {
    console.log("COMMERCIAL_AUTO rate book already exists — skipped");
  } else {
    const personal = await rateBooks.findOne({ product: "PERSONAL_AUTO" });
    if (!personal) throw new Error("PERSONAL_AUTO rate book not found to copy from");
    const { _id, __v, ...template } = personal;
    await rateBooks.insertOne({ ...template, product: "COMMERCIAL_AUTO", status: "ACTIVE" });
    console.log(
      `Created COMMERCIAL_AUTO rate book (${template.effectiveStartDate.toISOString().slice(0, 10)} → ${template.effectiveEndDate
        .toISOString()
        .slice(0, 10)})`
    );
  }

  await mongoose.disconnect();
})().catch(async (err) => {
  console.error("❌", err.message);
  await mongoose.disconnect();
  process.exit(1);
});
