/**
 * Calculate monthly scenarios for debt payoff vs investing
 * @param {Object} inputs - User inputs
 * @returns {Array} - Data points for charting
 */
export function calculateScenarios(inputs) {
  const { debtBalance, debtInterestRate, expectedReturn, monthlyPayment, years } = inputs;

  // Validation
  if (debtBalance <= 0 || monthlyPayment <= 0) {
    return [];
  }

  const months = years * 12;
  const monthlyDebtRate = debtInterestRate / 100 / 12;
  const monthlyInvestRate = expectedReturn / 100 / 12;

  const data = [];

  // Scenario A: Aggressive debt payoff
  let debtA = debtBalance;
  let investA = 0;

  // Scenario B: Minimum payments + invest
  let debtB = debtBalance;
  let investB = 0;

  for (let month = 0; month <= months; month++) {
    // Record yearly data points
    if (month % 12 === 0) {
      data.push({
        year: month / 12,
        payDebtNetWorth: Math.round(investA - debtA),
        investNetWorth: Math.round(investB - debtB),
      });
    }

    if (month === months) break;

    // === Scenario A: Pay Debt Aggressively ===
    if (debtA > 0) {
      const interestA = debtA * monthlyDebtRate;
      debtA = debtA + interestA;
      const paymentToDebt = Math.min(monthlyPayment, debtA);
      debtA = Math.max(0, debtA - paymentToDebt);

      // If debt paid off, invest any excess this month
      if (debtA === 0) {
        const excess = monthlyPayment - paymentToDebt;
        investA += excess;
      }
    } else {
      // Debt fully paid, invest everything
      investA = investA * (1 + monthlyInvestRate) + monthlyPayment;
    }

    // Apply investment growth for Scenario A if has balance and still paying debt
    if (investA > 0 && debtA > 0) {
      investA = investA * (1 + monthlyInvestRate);
    }

    // === Scenario B: Minimum Payment + Invest ===
    // With interest-only payments, debt principal stays unchanged
    const interestB = debtB * monthlyDebtRate;
    const minPayment = interestB;

    const availableToInvest = Math.max(0, monthlyPayment - minPayment);
    investB = investB * (1 + monthlyInvestRate) + availableToInvest;
  }

  return data;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount) {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(absAmount);

  return amount < 0 ? `-${formatted}` : formatted;
}
