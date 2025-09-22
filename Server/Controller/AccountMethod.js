const Account = require("../Models/AccountDetails");
const Contact = require("../Models/ContactDetails");
const Policy = require("../Models/PolicyDetails");

// Create a new Account for a Contact
const createAccount = async (req, res) => {
  try {
    const { customerId, accountType } = req.body;

    // validate contact exists
    const contact = await Contact.findById(customerId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const newAccount = new Account({ customerId, accountType });
    await newAccount.save();
    await newAccount.populate("customerId");

    res.status(201).json({ message: "Account created successfully", account: newAccount });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ message: "Failed to create account", error: err.message });
  }
};

// Get all accounts (optional: filter by customerId)
const getAccounts = async (req, res) => {
  try {
    const { customerId } = req.query;
    let query = {};
    if (customerId) query.customerId = customerId;

    const accounts = await Account.find(query)
      .populate("customerId")   // populate contact
      .populate("policies");    // populate policies

    res.status(200).json(accounts);
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).json({ message: "Failed to fetch accounts", error: err.message });
  }
};

// Get single account by ID
const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id)
      .populate("customerId")
      .populate("policies");

    if (!account) return res.status(404).json({ message: "Account not found" });

    res.status(200).json(account);
  } catch (err) {
    console.error("Error fetching account:", err);
    res.status(500).json({ message: "Failed to fetch account", error: err.message });
  }
};

// Update account info (status, type, etc.)
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Account.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Account not found" });

    res.status(200).json({ message: "Account updated successfully", account: updated });
  } catch (err) {
    console.error("Error updating account:", err);
    res.status(500).json({ message: "Failed to update account", error: err.message });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Account.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Account not found" });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Failed to delete account", error: err.message });
  }
};

// Search accounts by accountId, firstName, lastName, DOB
const searchAccounts = async (req, res) => {
  try {
    const { accountId, firstName, lastName, dateOfBirth } = req.body;
    let query = {};

    if (accountId) query.accountId = accountId;

    // Search by contact fields
    if (firstName || lastName || dateOfBirth) {
      const contacts = await Contact.find({
        ...(firstName && { firstName: new RegExp(firstName, "i") }),
        ...(lastName && { lastName: new RegExp(lastName, "i") }),
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
      });

      const contactIds = contacts.map((c) => c._id);
      query.customerId = { $in: contactIds };
    }

    const accounts = await Account.find(query)
      .populate("customerId")
      .populate("policies");

    if (!accounts.length) return res.status(404).json({ message: "No accounts found" });

    res.status(200).json(accounts);
  } catch (err) {
    console.error("Error searching accounts:", err);
    res.status(500).json({ message: "Failed to search accounts", error: err.message });
  }
};

// Link a policy to an account
const linkPolicyToAccount = async (req, res) => {
  try {
    const { id, policyId } = req.params;

    const account = await Account.findById(id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    const policy = await Policy.findById(policyId);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    // add reference both ways
    if (!account.policies.includes(policyId)) {
      account.policies.push(policyId);
      await account.save();
    }

    policy.accountId = id;
    await policy.save();

    res.status(200).json({ message: "Policy linked to account successfully", account });
  } catch (err) {
    console.error("Error linking policy:", err);
    res.status(500).json({ message: "Failed to link policy", error: err.message });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  searchAccounts,
  linkPolicyToAccount,
};
