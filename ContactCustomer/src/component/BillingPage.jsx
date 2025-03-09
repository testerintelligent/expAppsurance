import React, { useState } from "react";

const BillingPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [autoPay, setAutoPay] = useState(false);

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "Credit/Debit Card":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Expiry Date"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
                required
              />
            </div>
          </div>
        );
      case "Bank Account":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Account Number"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
              required
            />
            <input
              type="text"
              placeholder="Routing Number"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
              required
            />
          </div>
        );
      case "PayPal":
        return (
          <input
            type="email"
            placeholder="PayPal Email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg md:max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Billing Information
        </h2>

        {/* Billing Address */}
        <textarea
          placeholder="Billing Address"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white mb-4"
        ></textarea>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Payment Method</label>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white"
          >
            <option>Credit/Debit Card</option>
            <option>Bank Account</option>
            <option>PayPal</option>
          </select>
        </div>

        {renderPaymentFields()}

        {/* Payment Frequency */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Payment Frequency</label>
          <select className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 text-white">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Semi-Annual</option>
            <option>Annual</option>
          </select>
        </div>

        {/* Premium Information */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Premium Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-400">
          <p>Policy Number: 123456789</p>
          <p>Coverage Type: Health Insurance</p>
          <p>Premium Amount: $200.00</p>
          <p>Due Date: March 10, 2025</p>
        </div>

        {/* Billing History */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Billing History</h3>
        <div className="text-sm space-y-2">
          <p>
            Feb 10, 2025 - <span className="text-green-400">Paid</span> - $200
          </p>
          <p>
            Jan 10, 2025 - <span className="text-red-400">Failed</span> - $200
          </p>
        </div>

        {/* Auto-Pay */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            checked={autoPay}
            onChange={() => setAutoPay(!autoPay)}
            className="mr-2"
          />
          <label className="text-lg">Enable Auto-Pay</label>
        </div>

        {/* Payment Actions */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
            Make a Payment
          </button>
          <button className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg">
            Update Billing Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
