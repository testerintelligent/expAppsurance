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

  // Function to add a dependent
  const addDependent = () => {
    setQuoteData({ ...quoteData, dependents: [...quoteData.dependents, { name: '', age: '' }] });
  };

  // Function to handle changes for each dependent
  const handleDependentChange = (index, field, value) => {
    const updatedDependents = [...quoteData.dependents];
    updatedDependents[index] = { ...updatedDependents[index], [field]: value };
    setQuoteData({ ...quoteData, dependents: updatedDependents });
  };

  const generateQuote = (e) => {
    e.preventDefault();
    
    // Basic quote calculation logic (you can replace this with your actual quote calculation)
    let baseQuote = Math.random() * 1000; // Example base quote
    const annualIncome = parseFloat(quoteData.annualIncome) || 0;
    const existingDebts = parseFloat(quoteData.existingDebts) || 0;
    const futureExpenses = parseFloat(quoteData.futureExpenses) || 0;
    const finalExpenses = parseFloat(quoteData.finalExpenses) || 0;

    // Calculate based on gathered data
    const adjustedQuote = baseQuote + (annualIncome / 1000) + (existingDebts / 500) + (futureExpenses / 500) + (finalExpenses / 500);
    setQuoteData({ ...quoteData, generatedQuote: adjustedQuote.toFixed(2) });
  };

  return (
    <div style={{ backgroundColor: '#6946C6' }}>
      <div className="min-h-screen w-full bg-customPurple flex flex-col items-center p-6">
        <h2 className="text-white text-2xl font-bold mb-6">Quote Generation</h2>
        <div className="bg-white p-4 border-2 border-black rounded-md">
          <form onSubmit={generateQuote} className="w-full max-w-md">
            {/* Annual Income */}
            <div className="mb-4 flex">
              <label className="block text-black w-1/3">Annual Income</label>
              <input
                type="number"
                name="annualIncome"
                value={quoteData.annualIncome}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>

            {/* Existing Debts */}
            <div className="mb-4 flex">
              <label className="block text-black w-1/3">Existing Debts (e.g., mortgage, loans)</label>
              <input
                type="number"
                name="existingDebts"
                value={quoteData.existingDebts}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>

            {/* Future Expenses */}
            <div className="mb-4 flex">
              <label className="block text-black w-1/3">Future Expenses (e.g., children's education)</label>
              <input
                type="number"
                name="futureExpenses"
                value={quoteData.futureExpenses}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>

            {/* Final Expenses */}
            <div className="mb-4 flex">
              <label className="block text-black w-1/3">Final Expenses (e.g., funeral expenses)</label>
              <input
                type="number"
                name="finalExpenses"
                value={quoteData.finalExpenses}
                onChange={handleChange}
                className="w-2/3 p-2 mt-2 border border-black rounded"
              />
            </div>

            {/* Dependents */}
            <div className="mb-4">
              <button
                type="button"
                onClick={addDependent}
                className="bg-[#6946C6] text-white border-2 border-black px-4 py-2 rounded hover:bg-white hover:text-black"
              >
                Add Dependent
              </button>
            </div>

            {/* Render Dependent Fields */}
            {quoteData.dependents.map((dependent, index) => (
              <div key={index} className="mb-4">
                <div className="flex">
                  <label className="block text-black w-1/3">Dependent {index + 1} - Name</label>
                  <input
                    type="text"
                    name={`dependentName-${index}`}
                    value={dependent.name}
                    onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                    className="w-2/3 p-2 mt-2 border border-black rounded"
                  />
                </div>
                <div className="flex mt-2">
                  <label className="block text-black w-1/3">Dependent {index + 1} - Age</label>
                  <input
                    type="number"
                    name={`dependentAge-${index}`}
                    value={dependent.age}
                    onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                    className="w-2/3 p-2 mt-2 border border-black rounded"
                  />
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#6946C6] text-white border-2 border-black px-4 py-2 rounded hover:bg-white hover:text-black"
              >
                Generate Quote
              </button>
            </div>
          </form>

          {/* Displaying the Generated Quote */}
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
