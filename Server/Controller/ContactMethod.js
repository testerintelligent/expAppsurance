// const Contact=require('../Models/ContactDetails');

// exports.EnterContactDetails = async (req, res) => {
//   try {
//     const { 
//       firstName, 
//       lastName, 
//       email, 
//       phone, 
//       address, 
//       dateOfBirth 
//     } = req.body;

//     const ContactDetails = await Contact.findOne({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phone: phone,
//       'address.street': address.street,  
//       'address.city': address.city,     
//       'address.state': address.state,   
//       'address.zipCode': address.zipCode, 
//       dateOfBirth: dateOfBirth          
//     });

//     // If no contact found
//     if (!ContactDetails) {
//       return res.status(401).json({ message: 'Contact details are not completed' });
//     } else {
//       // If contact found
//       return res.status(200).json({ message: 'Contact Details Saved Successfully' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

const Contact = require('../Models/ContactDetails'); // adjust path as needed

// POST /postContact
const enterContactDetails = async (req, res) => {
    try {
        const contactData = req.body;

        const newContact = new Contact(contactData);
        await newContact.save();

        res.status(201).json({ message: 'Contact saved successfully', contact: newContact });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (unique fields)
            res.status(400).json({ error: 'Duplicate field: Email or Customer ID already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
};

//POST /getContact
const filterContactDetails= async (req, res) => {
    try {
        const { email, customerId } = req.body;

        const query = {};
        if (email) query.email = email;
        if (customerId) query.customerId = customerId;

        const contact = await Contact.findOne(query);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ contact });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const getContactDetails = async (req, res) => {
  try {
      const contacts = await Contact.find(); // No query passed, so it returns all documents

      res.status(200).json({ contacts });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


// DELETE /deleteContact/:id
const deleteContact= async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedContact = await Contact.findByIdAndDelete(id);
  
      if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted successfully', deletedContact });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };

  const updateContact=async(req,res)=>{
    try{
            const {id}=req.params;
            const updatedData=req.body;
            const updatedcontact=await Contact.findByIdAndUpdate(id,updatedData,{
                new:true,
                runValidators:true
            });
            // if(!updatedcontact){
            //     return res.status(404).json({message: 'Contact Not Found'});
            // }
            res.status(200).json({ message: 'Contact updated successfully', contact: updatedcontact });
    }
    catch(error){
        res.status(500).json({error:'Internal Server Error',details:error.message})
    }
  }
  // GET /contact/:id
const getContactById = async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findById(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({ contact });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };

  // Search Contact
const searchContact = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth } = req.query;

    if (!firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ error: "First Name, Last Name, and Date of Birth are required." });
    }

    const contact = await Contact.findOne({
      firstName: { $regex: new RegExp(firstName, "i") }, // case-insensitive
      lastName: { $regex: new RegExp(lastName, "i") },
      dateOfBirth: new Date(dateOfBirth),
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
  


module.exports = { enterContactDetails, getContactDetails,filterContactDetails,deleteContact,updateContact,getContactById,searchContact };

