import React, { useState } from 'react';

const QuoteGeneration = () => {
  const [quoteData, setQuoteData] = useState({
    policyType: '',
    coverageAmount: '',
    customerAge: '',
    generatedQuote: null,
  });

  const handleChange = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const generateQuote = (e) => {
    e.preventDefault();
    // Logic for generating quote
    const generated = Math.random() * 1000; // Example logic
    setQuoteData({ ...quoteData, generatedQuote: generated.toFixed(2) });
  };

  return (
    <div style={{ backgroundColor: '#6946C6' }}>
    <div className="min-h-screen w-full bg-customPurple flex flex-col items-center p-6">
      <h2 className="text-white text-2xl font-bold mb-6">Quote Generation</h2>
      <div className="bg-white p-4 border-2 border-black rounded-md">
      <form onSubmit={generateQuote} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-black">Policy Type</label>
          <select
            name="policyType"
            value={quoteData.policyType}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-black rounded"
          >
            <option value="">Select Policy Type</option>
            <option value="Life">Life</option>
            <option value="Health">Health</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-black">Coverage Amount</label>
          <input
            type="number"
            name="coverageAmount"
            value={quoteData.coverageAmount}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-black rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black">Customer Age</label>
          <input
            type="number"
            name="customerAge"
            value={quoteData.customerAge}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-black rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#6946C6] text-white border-2 border-black px-4 py-2 rounded hover:bg-white hover:text-black"
          >
            Generate Quote
          </button>
        </div>
      </form>

      {quoteData.generatedQuote && (
        <div className="mt-6 text-black">
          <h3 className="text-xl">Generated Quote: ${quoteData.generatedQuote}</h3>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default QuoteGeneration;
