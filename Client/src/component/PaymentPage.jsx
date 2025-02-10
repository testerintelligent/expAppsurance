import React, { useState } from 'react';

const PaymentPage = () => {
  const [premium, setPremium] = useState(0);
  const [policyAmount, setPolicyAmount] = useState('');

  const calculatePremium = () => {
    setPremium(Number(policyAmount) * 0.05);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment processing...");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-lg w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Payment Calculation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Enter your Policy Amount:</label>
            <input
              type="number"
              placeholder="Policy Amount"
              className="w-full p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={policyAmount}
              onChange={(e) => setPolicyAmount(e.target.value)}
              required
            />
          </div>
          <button 
            type="button" 
            onClick={calculatePremium} 
            className="w-full p-3 border-2 border-white rounded-md text-white bg-purple-600 hover:bg-white hover:text-black font-bold transition"
          >
            Calculate Premium
          </button>
          <p className="text-lg font-semibold text-center">Premium: ₹{premium}</p>
          <button 
            type="submit" 
            className="w-full p-3 border-2 border-white rounded-md text-white bg-green-500 hover:bg-white hover:text-black font-bold transition"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
