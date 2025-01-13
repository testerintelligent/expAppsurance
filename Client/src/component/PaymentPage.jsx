import React, { useState } from 'react';

const PaymentPage = () => {
  const [premium, setPremium] = useState(0);
  const [policyAmount, setPolicyAmount] = useState(0);

  const calculatePremium = () => {
    setPremium(Number(policyAmount) * 0.05); // Convert to number for calculation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment logic here
    alert("Payment processing...");
  };

  return (
    <div className='pb-80 pt-11 pl-72 pr-64 items-center'style={{ backgroundColor: '#6946C6' }}>
       <h2 className='text-white text-2xl font-bold mb-6' >Payment Calculation</h2>
      <div className='bg-white p-4 border-2 border-black rounded-md '>
    <form onSubmit={handleSubmit}>
      <label>Enter your Policy Amount : </label>
      <input
        type="number"
        placeholder="Policy Amount"
        className='border-2 border-black p-2'
        value={policyAmount}
        onChange={(e) => setPolicyAmount(e.target.value)}
      />
      <button type="button" onClick={calculatePremium} className='text-white p-2 border-2 border-black m-2 rounded-md bg-[#6946C6] hover:text-black hover:bg-white'>
        Calculate Premium
      </button>
      <p>Premium: {premium}</p>
      <button type="submit" className='p-2 border-2 border-black m-2 rounded-md text-white bg-[#6946C6] hover:text-black hover:bg-white'>Proceed to Pay</button>
    </form>
    </div>
    </div>
  );
};

export default PaymentPage;
