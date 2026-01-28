import { useState, useEffect } from 'react';
import InputForm from './InputForm';
import ComparisonChart from './ComparisonChart';
import ResultsSummary from './ResultsSummary';
import { calculateScenarios } from './calculations';
import './DebtVsInvestingCalculator.css';

function DebtVsInvestingCalculator() {
  const [inputs, setInputs] = useState({
    debtBalance: 10000,
    debtInterestRate: 18,
    expectedReturn: 7,
    monthlyPayment: 500,
    years: 5
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = calculateScenarios(inputs);
    setChartData(data);
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="debt-vs-investing-calculator">
      <h2>Debt Payoff vs Investing Calculator</h2>
      <p className="subtitle">
        Should you pay off debt or invest? Compare both strategies.
      </p>

      <div className="calculator-layout">
        <InputForm inputs={inputs} onInputChange={handleInputChange} />
        <ComparisonChart data={chartData} />
      </div>

      <ResultsSummary data={chartData} years={inputs.years} />
    </div>
  );
}

export default DebtVsInvestingCalculator;
