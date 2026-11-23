// ─── Commercial Auto coverage options ─────────────────────────────────────────
// Single source of truth for CommercialVehicle, Quote, Payment, and
// PolicyIssuance when the product is "Commercial Auto".

export const COMMERCIAL_COVERAGE_OPTIONS = [
  {
    name: "Commercial Liability",
    description:
      "Covers bodily injury and property damage to third parties caused by your commercial vehicle. Mandatory by law.",
    premium: 500,
    mandatory: true,
  },
  {
    name: "Collision",
    description:
      "Covers repair or replacement of your commercial vehicle after a collision, regardless of fault.",
    premium: 600,
    mandatory: false,
  },
  {
    name: "Comprehensive",
    description:
      "Covers non-collision damage including theft, vandalism, fire, and weather events.",
    premium: 450,
    mandatory: false,
  },
  {
    name: "Hired Auto",
    description:
      "Covers liability for vehicles rented or leased by your business for commercial use.",
    premium: 200,
    mandatory: false,
  },
  {
    name: "Non-Owned Auto",
    description:
      "Covers employees using their personal vehicles for business purposes on your behalf.",
    premium: 180,
    mandatory: false,
  },
  {
    name: "Cargo Coverage",
    description:
      "Covers goods, freight, or cargo being transported in or on your commercial vehicle.",
    premium: 350,
    mandatory: false,
  },
  {
    name: "Uninsured Motorist",
    description:
      "Protects your business if your vehicle is hit by an uninsured or underinsured driver.",
    premium: 150,
    mandatory: false,
  },
];

// Default selection — only the mandatory coverage pre-checked
export const COMMERCIAL_DEFAULT_COVERAGES = COMMERCIAL_COVERAGE_OPTIONS.filter(
  (c) => c.mandatory
).map((c) => c.name);

// Helper: sum up premium for a list of selected coverage names
export const sumCommercialCoveragePremiums = (selectedNames = []) =>
  COMMERCIAL_COVERAGE_OPTIONS.filter((c) =>
    selectedNames.includes(c.name)
  ).reduce((sum, c) => sum + c.premium, 0);
