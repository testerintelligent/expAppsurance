const mongoose = require("mongoose");
const Account = require("../Models/AccountDetails");
const Contact = require("../Models/ContactDetails");

/**
 * @swagger
 * tags:
 * - name: Accounts
 *   description: Customer account management API
 */

// --- 1️⃣ Create Account for a Contact ---
/**
 * @swagger
 * /accounts/createAccount:
 *   post:
 *     summary: Create an account for a contact
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - accountType
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: MongoDB ObjectId of the contact
 *               accountType:
 *                 type: string
 *                 enum: [Individual, Corporate]
 *     responses:
 *       201:
 *         description: Account created successfully
 *       200:
 *         description: Account already exists and returned
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
const createAccount = async (req, res) => {
  try {
    const { customerId, accountType } = req.body;

    const contact = await Contact.findById(customerId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // ✅ Step 2: Check if account already exists
    // populate customer and policies so frontend can immediately show policies
    let existingAccount = await Account.findOne({ customerId }).populate("customerId").populate("policies");
    if (existingAccount) {
      return res.status(200).json(existingAccount); // return existing one instead of error
    }

    // ✅ Step 3: Create new account
    const newAccount = new Account({
      customerId,
      accountType,
      accountHolderName: `${contact.firstName} ${contact.lastName}`,
    });

    const savedAccount = await newAccount.save();

    // ✅ Step 4: Populate contact details before sending
    const populatedAccount = await Account.findById(savedAccount._id).populate("customerId").populate("policies");

    res.status(201).json(populatedAccount);
  } catch (err) {
    console.error("❌ Error creating account:", err);
    res.status(500).json({ message: "Error creating account", error: err.message });
  }
};

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Search accounts by Account ID, First Name, Last Name, or Date of Birth
 *     tags: [Accounts]
 *     parameters:
 *       - in: query
 *         name: accountId
 *         schema:
 *           type: string
 *         description: Account ID to search for
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: First name of the contact
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Last name of the contact
 *       - in: query
 *         name: dateOfBirth
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of Birth (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Account(s) found successfully
 *       404:
 *         description: No accounts found
 *       500:
 *         description: Internal server error
 */
// --- 2️⃣ Search Accounts ---
const getAccounts = async (req, res) => {
  try {
    const { accountId, firstName, lastName, dateOfBirth } = req.query;
    let filter = {};

    if (accountId) {
      filter.accountId = accountId;
    }

    let accounts;

    if (firstName || lastName || dateOfBirth) {
      const contactFilter = {};
      if (firstName) contactFilter.firstName = { $regex: new RegExp(firstName, "i") };
      if (lastName) contactFilter.lastName = { $regex: new RegExp(lastName, "i") };
      if (dateOfBirth) contactFilter.dateOfBirth = new Date(dateOfBirth);

      const contacts = await Contact.find(contactFilter, "_id");
      const contactIds = contacts.map((c) => c._id);
      // populate policies as well so UI can render policy rows
      accounts = await Account.find({ customerId: { $in: contactIds } }).populate("customerId").populate("policies");
    } else {
      accounts = await Account.find(filter).populate("customerId").populate("policies");
    }

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: "No accounts found matching the criteria." });
    }

    res.status(200).json(accounts.length === 1 ? accounts[0] : accounts);
  } catch (err) {
    console.error("❌ Error fetching accounts:", err);
    res.status(500).json({ message: "Error fetching accounts", error: err.message });
  }
};

/**
 * @swagger
 * /accounts/byContact/{contactId}:
 *   get:
 *     summary: Get account details for a specific contact
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Account found for the given contact
 *       404:
 *         description: No account found for this contact
 *       500:
 *         description: Internal server error
 */
// --- 3️⃣ Get Account by Contact ID ---
const getAccountByContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    // ✅ Convert to ObjectId for accurate lookup
    const account = await Account.findOne({
      customerId: new mongoose.Types.ObjectId(contactId)
    }).populate("customerId").populate("policies");

    if (!account) {
      return res.status(404).json({ message: "No account found for this contact" });
    }

    res.status(200).json(account);
  } catch (err) {
    console.error("❌ Error fetching account by contact:", err);
    res.status(500).json({ message: "Error fetching account by contact", error: err.message });
  }
};

// --- 4️⃣ Update Account ---
const updateAccount = async (req, res) => {
  try {
    const updated = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, lastUpdated: Date.now() },
      { new: true, runValidators: true }
    ).populate("customerId");

    if (!updated) return res.status(404).json({ message: "Account not found" });
    // ensure policies populated on update response
    const populated = await Account.findById(updated._id).populate('customerId').populate('policies');
    res.status(200).json(populated);
  } catch (err) {
    res.status(400).json({ message: "Error updating account", error: err.message });
  }
};

// --- 5️⃣ Delete Account ---
const deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Account not found" });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account", error: err.message });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountByContact,
  updateAccount,
  deleteAccount,
};
