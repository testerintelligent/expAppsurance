import React from 'react';
import '../style/InsurancePage.css';

const InsurancePage = () => {
  return (
    <div className="insurance-page">
      <h1>Insurance Policy Details</h1>
      <form className="insurance-form">
        <div className="form-group">
          <label className="insuranceLabel" htmlFor="name">Name:</label>
          <input className='insuranceInput' type="text" id="name" name="name" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="address">Address:</label>
          <input className='insuranceInput' type="text" id="address" name="address" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="dob">Date of Birth:</label>
          <input className='insuranceInput' type="date" id="dob" name="dob" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="policy-number">Policy Number:</label>
          <input className='insuranceInput' type="text" id="policy-number" name="policy-number" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="policy-type">Policy Type:</label>
          <input className='insuranceInput' type="text" id="policy-type" name="policy-type" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="effective-date">Effective Date:</label>
          <input className='insuranceInput' type="date" id="date" name="effective-date" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="expiration-date">Expiration Date:</label>
          <input className='insuranceInput' type="date" id="date" name="expiration-date" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="coverage-limits">Coverage Limits:</label>
          <input className='insuranceInput' type="text" id="coverage-limits" name="coverage-limits" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="premium">Premium:</label>
          <input className='insuranceInput' type="number" id="premium" name="premium" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="deductible">Deductible:</label>
          <input className='insuranceInput' type="number" id="deductible" name="deductible" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="beneficiaries">Beneficiaries:</label>
          <input className='insuranceInput' type="text" id="beneficiaries" name="beneficiaries" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="exclusions">Exclusions:</label>
          <textarea id="exclusions" name="exclusions" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="riders">Riders:</label>
          <input className='insuranceInput' type="text" id="riders" name="riders" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="claim-number">Claim Number:</label>
          <input className='insuranceInput' type="text" id="claim-number" name="claim-number" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="claim-date">Claim Date:</label>
          <input className='insuranceInput' type="date" id="date" name="claim-date" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="claim-status">Claim Status:</label>
          <input className='insuranceInput' type="text" id="claim-status" name="claim-status" />
        </div>

        <div className="form-group">
          <label className="insuranceLabel" htmlFor="claim-amount">Claim Amount:</label>
          <input className='insuranceInput' type="number" id="claim-amount" name="claim-amount" />
        </div>

        <button className='insuranceButton' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InsurancePage;
