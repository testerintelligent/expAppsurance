// ─── Shared coverage options ──────────────────────────────────────────────────
// Single source of truth used by Vehicle, Quote, Payment, and PolicyIssuance.
// Changing a premium here updates the entire workflow automatically.

export const COVERAGE_OPTIONS = [
  {
    name: "Third-Party Liability",
    description:
      "Covers damages or injuries caused to a third party by your vehicle. Mandatory by law.",
    premium: 120,
    mandatory: true,
  },
  {
    name: "Own Damage",
    description:
      "Covers repair or replacement costs for damage to your own vehicle.",
    premium: 250,
    mandatory: false,
  },
  {
    name: "Comprehensive",
    description:
      "Provides combined protection including third-party liability and own damage.",
    premium: 400,
    mandatory: false,
  },
  {
    name: "Personal Accident Cover",
    description:
      "Covers medical expenses or compensation in case of injury or death of the driver.",
    premium: 80,
    mandatory: false,
  },
  {
    name: "Zero Depreciation",
    description:
      "Allows full claim without deducting depreciation on replaced parts.",
    premium: 150,
    mandatory: false,
  },
  {
    name: "Vehicle theft",
    description:
      "Provides coverage if your vehicle is stolen or declared a total loss.",
    premium: 110,
    mandatory: false,
  },
];

// Default selection — only the mandatory coverage pre-checked
export const DEFAULT_COVERAGES = COVERAGE_OPTIONS.filter(
  (c) => c.mandatory
).map((c) => c.name);

// Helper: sum up premium for a list of selected coverage names
export const sumCoveragePremiums = (selectedNames = []) =>
  COVERAGE_OPTIONS.filter((c) => selectedNames.includes(c.name)).reduce(
    (sum, c) => sum + c.premium,
    0
  );
