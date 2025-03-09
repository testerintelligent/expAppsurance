const Contact=require('../Models/ContactDetails');

exports.EnterContactDetails = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      address, 
      dateOfBirth 
    } = req.body;

    const ContactDetails = await Contact.findOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      'address.street': address.street,  
      'address.city': address.city,     
      'address.state': address.state,   
      'address.zipCode': address.zipCode, 
      dateOfBirth: dateOfBirth          
    });

    // If no contact found
    if (!ContactDetails) {
      return res.status(401).json({ message: 'Contact details are not completed' });
    } else {
      // If contact found
      return res.status(200).json({ message: 'Contact Details Saved Successfully' });
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
