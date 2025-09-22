const Policy = require('../Models/PolicyDetails');

// POST /postPolicy — Add a new policy
 const enterPolicyDetails = async (req, res) => {
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

//Delete - the selected policy
const deletePolicyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Trying to delete policy with ID:", id);
    const result = await Policy.findById(id);
    if (!result) {
      console.log("Policy not found");
      return res.status(404).json({ message: 'Policy not found' });
    }
    await Policy.findByIdAndDelete(id);
    console.log("Policy deleted");
    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.error('Error deleting Policy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePolicyInfo = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Policy.findById(id);
    if (!result) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    await Policy.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Policy Update successfully" });
  } catch (error) {
    console.error('Error deleting Policy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
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


//Policy Summary with counts by status
const getPolicySummary = async (req, res) => {
  try {
    const totalPolicies = await Policy.countDocuments();

    const statusCounts = await Policy.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Flatten into one object
    const summary = { totalPolicies };
    statusCounts.forEach(item => {
      summary[item._id] = item.count;
    });

    res.status(200).json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch policy summary', error: err.message });
  }
};

module.exports = {enterPolicyDetails,getPolicyDetails,deletePolicyInfo,updatePolicyInfo,getPolicySummary};
