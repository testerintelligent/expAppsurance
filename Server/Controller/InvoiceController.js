const Invoice = require("../Models/InvoiceDetails");
const Policy = require("../Models/PolicyDetails");

exports.createInvoice = async (req, res) => {
  try {
    const { ...invoiceData } = req.body;

    const invoice = new Invoice({
      ...invoiceData,
    });

    await invoice.save();

    res.status(201).json({
      message: "invoice created successfully",
      invoice,
    });
  } catch (err) {
    console.error("❌ Error creating invoice:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllInvoice = async (req, res) => {
  try {
    // Fetch all policies from the database
    const invoices = await Invoice.find({});

    // Map policies to return only relevant information
    const invoiceData = invoices.map((invoice) => ({
      policyNumber: invoice.policyNumber,
      productType: invoice.productType,
      effectiveDate: invoice.effectiveDate,
      expiryDate: invoice.expiryDate,
      totalPremium: invoice.totalPremium,
      totalCost: invoice.totalCost,
      status: "Pending",
      // Add other fields if needed, like customer info from other collections
    }));

    res.status(200).json({
      message: "Invoice fetched successfully",
      invoices: invoiceData,
    });
  } catch (err) {
    console.error("Error fetching invoice:", err);
    res.status(500).json({ message: "Error fetching invoice" });
  }
};

exports.getInvoiceByPolicyNumber = async (req, res) => {
  const { policyNumber } = req.params;

  // const invoice = await Invoice.findOne({ policyNumber });
  const invoice = await Policy.findOne({ policyNumber }).populate("policyId");

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  res.json({
    invoice,
  });
};
