const { calculatePremium } = require("../services/ratingEngine");

exports.calculate = async (req, res) => {
  try {
    const { product, policyDate, input } = req.body;

    const premium = await calculatePremium(product, policyDate, input);

    res.json({ success: true, premium });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};