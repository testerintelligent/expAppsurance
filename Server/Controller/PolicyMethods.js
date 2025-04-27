const Policy = require('../Models/PolicyDetails');

// POST /postPolicy — Add a new policy
 const enterPolicyDetails=async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).json({ message: 'Policy created successfully', policy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create policy', error: err.message });
  }
};

// GET /getPolicy — List all policies
const getPolicyDetails=async (req, res) => {
  try {
    const policies = await Policy.find();
    res.status(200).json(policies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch policies', error: err.message });
  }
};

// GET /filterPolicy/:id — Get single policy by ID
// router.get('/filterPolicy/:id', async (req, res) => {
//   try {
//     const policy = await Policy.findOne({ _id: req.params.id }).populate('customerId');
//     if (!policy) {
//       return res.status(404).json({ message: 'Policy not found' });
//     }
//     res.status(200).json(policy);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch policy', error: err.message });
//   }
// });

module.exports = {enterPolicyDetails,getPolicyDetails};
