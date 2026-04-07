const RateTable = require("../Models/RateTable");

const getFactor = async (tableName, value) => {
  const table = await RateTable.findOne({ name: tableName });

  if (!table) return 1;

  // FACTOR type
  if (table.type === "FACTOR") {
    const row = table.data.find(
      (r) => value >= r.min && value <= r.max
    );
    return row ? row.factor : 1;
  }

  // LOOKUP type
  if (table.type === "LOOKUP") {
    const row = table.data.find(
      (r) =>
        r.key &&
        r.key.toString().toLowerCase() === value.toString().toLowerCase()
    );
    return row ? row.factor : 1;
  }

  return 1;
};

const getValue = async (tableName, key, field = "factor") => {
  const table = await RateTable.findOne({ name: tableName });

  if (!table) return 1;

  const row = table.data.find((r) => r.key === key);

  return row ? row[field] : 1;
};

module.exports = { getFactor, getValue };