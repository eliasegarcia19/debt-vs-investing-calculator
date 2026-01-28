function InputForm({ inputs, onInputChange }) {
  const handleChange = (field) => (e) => {
    const value = parseFloat(e.target.value) || 0;
    onInputChange(field, value);
  };

  return (
    <div className="input-form">
      <h3>Enter Your Details</h3>

      <div className="input-group">
        <label htmlFor="debtBalance">Current Debt Balance</label>
        <div className="input-with-prefix">
          <span className="prefix">$</span>
          <input
            type="number"
            id="debtBalance"
            value={inputs.debtBalance}
            onChange={handleChange('debtBalance')}
            min="0"
            step="100"
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="debtInterestRate">Debt Interest Rate (Annual)</label>
        <div className="input-with-suffix">
          <input
            type="number"
            id="debtInterestRate"
            value={inputs.debtInterestRate}
            onChange={handleChange('debtInterestRate')}
            min="0"
            max="100"
            step="0.5"
          />
          <span className="suffix">%</span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="expectedReturn">Expected Investment Return (Annual)</label>
        <div className="input-with-suffix">
          <input
            type="number"
            id="expectedReturn"
            value={inputs.expectedReturn}
            onChange={handleChange('expectedReturn')}
            min="0"
            max="100"
            step="0.5"
          />
          <span className="suffix">%</span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="monthlyPayment">Monthly Payment Amount</label>
        <div className="input-with-prefix">
          <span className="prefix">$</span>
          <input
            type="number"
            id="monthlyPayment"
            value={inputs.monthlyPayment}
            onChange={handleChange('monthlyPayment')}
            min="0"
            step="50"
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="years">Time Horizon: {inputs.years} years</label>
        <input
          type="range"
          id="years"
          value={inputs.years}
          onChange={handleChange('years')}
          min="1"
          max="10"
          step="1"
        />
        <div className="range-labels">
          <span>1 year</span>
          <span>10 years</span>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
