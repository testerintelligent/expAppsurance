const Invoice = require("../Models/InvoiceDetails");

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
