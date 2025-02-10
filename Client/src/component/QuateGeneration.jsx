import React, { useState } from 'react';

const QuoteGeneration = () => {
  const [quoteData, setQuoteData] = useState({
    annualIncome: '',
    existingDebts: '',
    futureExpenses: '',
    finalExpenses: '',
    dependents: [],
    generatedQuote: null,
  });

  const handleChange = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const addDependent = () => {
    setQuoteData({ 
      ...quoteData, 
      dependents: [...quoteData.dependents, { name: '', age: '' }] 
    });
  };

  const handleDependentChange = (index, field, value) => {
    const updatedDependents = [...quoteData.dependents];
    updatedDependents[index] = { ...updatedDependents[index], [field]: value };
    setQuoteData({ ...quoteData, dependents: updatedDependents });
  };

  const generateQuote = (e) => {
    e.preventDefault();
    
    let baseQuote = Math.random() * 1000; 
    const annualIncome = parseFloat(quoteData.annualIncome) || 0;
    const existingDebts = parseFloat(quoteData.existingDebts) || 0;
    const futureExpenses = parseFloat(quoteData.futureExpenses) || 0;
    const finalExpenses = parseFloat(quoteData.finalExpenses) || 0;

    const adjustedQuote = baseQuote + (annualIncome / 1000) + (existingDebts / 500) + (futureExpenses / 500) + (finalExpenses / 500);
    setQuoteData({ ...quoteData, generatedQuote: adjustedQuote.toFixed(2) });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-lg w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Quote Generation</h2>
        <form onSubmit={generateQuote} className="space-y-6">
          {[
            { label: "Annual Income", name: "annualIncome" },
            { label: "Existing Debts", name: "existingDebts" },
            { label: "Future Expenses", name: "futureExpenses" },
            { label: "Final Expenses", name: "finalExpenses" },
          ].map((field, index) => (
            <div key={index} className="flex items-center">
              <label className="text-lg font-medium w-1/3 text-right pr-6">{field.label}:</label>
              <input
                type="number"
                name={field.name}
                value={quoteData[field.name]}
                onChange={handleChange}
                className="w-2/3 p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={addDependent}
              className="bg-purple-600 text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black font-bold transition"
            >
              Add Dependent
            </button>
          </div>

          {quoteData.dependents.map((dependent, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center">
                <label className="text-lg font-medium w-1/3 text-right pr-6">Dependent {index + 1} - Name:</label>
                <input
                  type="text"
                  value={dependent.name}
                  onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                  className="w-2/3 p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg font-medium w-1/3 text-right pr-6">Dependent {index + 1} - Age:</label>
                <input
                  type="number"
                  value={dependent.age}
                  onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                  className="w-2/3 p-3 rounded-md border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-purple-600 text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-black font-bold transition"
            >
              Generate Quote
            </button>
          </div>
        </form>

        {quoteData.generatedQuote && (
          <div className="mt-6 text-white text-center">
            <h3 className="text-xl font-bold">Generated Quote: ${quoteData.generatedQuote}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGeneration;
