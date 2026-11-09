use("registeredUser");

db.getCollection("ratebooks").insertMany([
  {
    product: "Personal Auto",
    status: "ACTIVE",
    effectiveStartDate: new Date("2026-01-01"),
    effectiveEndDate: new Date("2026-12-31"),
    rateTables: ["RT_BASE_PREMIUM", "RT_COUNTRY", "RT_STATE", "RT_CITY", "RT_LICENSE", "RT_DRIVING_EXP", "RT_CLAIM_HISTORY", "RT_VEHICLE_AGE"],
    rateRoutines: ["BASE_PREMIUM_CALC", "LOCATION_FACTOR_CALC", "DRIVER_FACTOR_CALC"]
  },
  {
    product: "Personal Auto",
    status: "INACTIVE",
    effectiveStartDate: new Date("2025-01-01"),
    effectiveEndDate: new Date("2025-12-31"),
    rateTables: ["RT_BASE_PREMIUM", "RT_COUNTRY", "RT_STATE"],
    rateRoutines: ["BASE_PREMIUM_CALC", "LOCATION_FACTOR_CALC"]
  }
]);

// ---- Rate tables (upsert by name so re-running doesn't duplicate) ----
const rateTables = [
  { name: "RT_BASE_PREMIUM", type: "LOOKUP", data: [
    { key: "Personal Auto", baseRate: 500 }, { key: "HOME", baseRate: 400 }, { key: "LIFE", baseRate: 300 } ] },
  { name: "RT_COUNTRY", type: "LOOKUP", data: [
    { key: "India", factor: 1.0 }, { key: "USA", factor: 1.5 }, { key: "UK", factor: 1.3 } ] },
  { name: "RT_STATE", type: "LOOKUP", data: [
    { key: "Tamil Nadu", factor: 1.0 }, { key: "Karnataka", factor: 1.1 }, { key: "Maharashtra", factor: 1.2 },
    { key: "California", factor: 1.4 }, { key: "Texas", factor: 1.2 } ] },
  { name: "RT_CITY", type: "LOOKUP", data: [
    { key: "Chennai", factor: 1.1 }, { key: "Coimbatore", factor: 0.95 }, { key: "Bangalore", factor: 1.15 },
    { key: "Mumbai", factor: 1.25 }, { key: "Los Angeles", factor: 1.3 } ] },
  { name: "RT_LICENSE", type: "LOOKUP", data: [
    { key: "Permanent", factor: 1.0 }, { key: "Learner", factor: 1.4 }, { key: "International", factor: 1.2 } ] },
  { name: "RT_DRIVING_EXP", type: "FACTOR", data: [
    { min: 0, max: 2, factor: 1.4 }, { min: 3, max: 5, factor: 1.2 },
    { min: 6, max: 10, factor: 1.0 }, { min: 11, max: 60, factor: 0.9 } ] },
  { name: "RT_CLAIM_HISTORY", type: "FACTOR", data: [
    { min: 0, max: 0, factor: 0.9 }, { min: 1, max: 1, factor: 1.1 },
    { min: 2, max: 3, factor: 1.3 }, { min: 4, max: 99, factor: 1.6 } ] },
  { name: "RT_VEHICLE_AGE", type: "FACTOR", data: [
    { min: 0, max: 2, factor: 1.2 }, { min: 3, max: 7, factor: 1.0 },
    { min: 8, max: 15, factor: 0.9 }, { min: 16, max: 50, factor: 0.8 } ] }
];
rateTables.forEach(t => db.getCollection("ratetables").replaceOne({ name: t.name }, t, { upsert: true }));

// ---- Rate routines (executed in ratebook order; `premium` carries over) ----
const rateRoutines = [
  { name: "BASE_PREMIUM_CALC", formula: "baseRate" },
  { name: "LOCATION_FACTOR_CALC", formula: "premium * countryFactor * stateFactor * cityFactor" },
  { name: "DRIVER_FACTOR_CALC", formula: "premium * licenseFactor * drivingExpFactor * claimFactor * vehicleFactor" }
];
rateRoutines.forEach(r => db.getCollection("rateroutines").replaceOne({ name: r.name }, r, { upsert: true }));


// ---- RT_LOCATION: used by the pricing app (http://localhost:3004) to list rows ----
db.getCollection("ratetables").replaceOne(
  { name: "RT_LOCATION" },
  { name: "RT_LOCATION", type: "LOOKUP", data: [
    { key: "Chennai", factor: 1.1 }, { key: "Coimbatore", factor: 0.95 }, { key: "Bangalore", factor: 1.15 },
    { key: "Mumbai", factor: 1.25 }, { key: "Los Angeles", factor: 1.3 } ] },
  { upsert: true }
);
