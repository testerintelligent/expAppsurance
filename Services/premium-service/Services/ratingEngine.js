const RateBook = require("../Models/RateBook");
const RateRoutine = require("../Models/RateRoutine");
const { getFactor, getValue } = require("./rateTableService");
const evaluate = require("./formulaEvaluator");

// The UI sends display names ("Personal Auto"); rate books and the base-rate
// table are keyed by code ("PERSONAL_AUTO"). Accept either form.
const toProductCode = (product) =>
  String(product || "").trim().toUpperCase().replace(/[\s-]+/g, "_");

const calculatePremium = async (product, policyDate, input) => {
  const productCode = toProductCode(product);

  const date = new Date(policyDate || new Date());

  // Pick correct version
  const rateBook = await RateBook.findOne({
    product: productCode,
    status: "ACTIVE",
    effectiveStartDate: { $lte: date },
    effectiveEndDate: { $gte: date }
  });

  if (!rateBook)
    throw new Error(
      `No active RateBook found for ${productCode} on ${date.toISOString().slice(0, 10)}`
    );

  let vars = { ...input };

  vars.baseRate = await getValue("RT_BASE_PREMIUM", productCode, "baseRate");

  vars.countryFactor = await getFactor("RT_COUNTRY", input.country);
  vars.stateFactor = await getFactor("RT_STATE", input.state);
  vars.cityFactor = await getFactor("RT_CITY", input.city);
  vars.licenseFactor = await getFactor("RT_LICENSE", input.licenseType);

  vars.drivingExpFactor = await getFactor("RT_DRIVING_EXP", input.drivingExperience);
  vars.claimFactor = await getFactor("RT_CLAIM_HISTORY", input.claimHistory);
  vars.vehicleFactor = await getFactor("RT_VEHICLE_AGE", input.vehicleAge);
  
  let premium = 0;

  for (let r of rateBook.rateRoutines) {
    const routine = await RateRoutine.findOne({ name: r });

    premium = evaluate(routine.formula, {
      ...vars,
      premium
    });
  }

console.log("BaseRate:", vars.baseRate);
console.log("CountryFactor:", vars.countryFactor);
console.log("StateFactor:", vars.stateFactor);
console.log("CityFactor:", vars.cityFactor);
console.log("LicenseFactor:", vars.licenseFactor);
console.log("DrivingExpFactor:", vars.drivingExpFactor);
console.log("ClaimFactor:", vars.claimFactor);
console.log("VehicleFactor:", vars.vehicleFactor);


  return premium;
};

module.exports = { calculatePremium };