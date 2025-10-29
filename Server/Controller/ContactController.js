// Controllers/ContactController.js
const Contact = require('../Models/ContactDetails');
/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: Customer contact management API
 */

// --- POST: Create a new Contact ---
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact (and automatically create an account)
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactDetails'
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             dateOfBirth: 1990-05-15
 *             email: john.doe@example.com
 *             phone: 9876543210
 *             gender: Male
 *             address: 123 Main St, Chennai
 *             city: Chennai
 *             state: TamilNadu
 *             zipCode: 62701
 *             organization: Acme Corp
 *             producerCode: 12345
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactDetails'
 *       400:
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
const createContact = async (req, res) => {
  try {
    // 1️⃣ Save the new contact
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: 'Error creating contact', error: err.message });
  }
};

// --- GET: Search Contacts ---
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Search contacts by first name, last name, or date of birth
 *     description: Returns a list of contacts matching the provided search criteria. At least one query parameter is required.
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Search by customer's first name (partial, case-insensitive)
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Search by customer's last name (partial, case-insensitive)
 *       - in: query
 *         name: dateOfBirth
 *         schema:
 *           type: string
 *           format: date
 *         description: Search by exact date of birth (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of matching contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactDetails'
 *       400:
 *         description: Missing required search parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: No contacts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const searchContact = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth } = req.query;

    if (!firstName && !lastName && !dateOfBirth) {
      return res.status(400).json({
        error: "Please provide at least one search parameter: firstName, lastName, or dateOfBirth."
      });
    }

    const filter = {};
    if (firstName) filter.firstName = { $regex: new RegExp(firstName, "i") };
    if (lastName) filter.lastName = { $regex: new RegExp(lastName, "i") };
    if (dateOfBirth) {
      const start = new Date(dateOfBirth);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(dateOfBirth);
      end.setUTCHours(23, 59, 59, 999);
      filter.dateOfBirth = { $gte: start, $lte: end };
    }

    const contacts = await Contact.find(filter);

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found matching the criteria." });
    }

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- PUT: Edit Contact ---
const editContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedContact)
      return res.status(404).json({ message: 'Contact not found for update' });
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: 'Error updating contact', error: err.message });
  }
};

// --- DELETE: Delete Contact ---
const deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Contact not found for deletion' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err.message });
  }
};

module.exports = {
  createContact,
  searchContact,
  editContact,
  deleteContact
};
