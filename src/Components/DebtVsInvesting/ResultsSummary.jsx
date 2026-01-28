import { formatCurrency } from './calculations';

function ResultsSummary({ data, years }) {
  if (!data || data.length === 0) {
    return null;
  }

  const finalData = data[data.length - 1];
  const difference = finalData.payDebtNetWorth - finalData.investNetWorth;
  const winner = difference > 0 ? 'Pay Debt First' : 'Invest Instead';
  const winnerClass = difference > 0 ? 'pay-debt-wins' : 'invest-wins';

  return (
    <div className="results-summary">
      <h3>After {years} Years</h3>

      <div className="results-grid">
        <div className="result-card pay-debt">
          <h4>Pay Debt First</h4>
          <p className="net-worth">{formatCurrency(finalData.payDebtNetWorth)}</p>
          <p className="description">Net Worth</p>
        </div>

        <div className="result-card invest">
          <h4>Invest Instead</h4>
          <p className="net-worth">{formatCurrency(finalData.investNetWorth)}</p>
          <p className="description">Net Worth</p>
        </div>
      </div>

      <div className={`winner-announcement ${winnerClass}`}>
        <strong>{winner}</strong> comes out ahead by{' '}
        <strong>{formatCurrency(Math.abs(difference))}</strong>
      </div>

      <p className="disclaimer">
        * This is a simplified model. Actual results depend on market conditions,
        tax implications, and other factors not considered here.
      </p>
    </div>
  );
}

export default ResultsSummary;
