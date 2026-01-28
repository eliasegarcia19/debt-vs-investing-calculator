# CLAUDE.md

Project context and learnings for AI assistants.

## Project Overview

React 19 application built with Create React App. Features a debt payoff vs investing comparison calculator.

## Architecture Decisions

### Charting Library: Recharts
- Chose Recharts over Chart.js, Victory, and Nivo
- Reasons: React-native API, lightweight (~45KB), declarative components, good for line charts
- Usage: `<LineChart>`, `<Line>`, `<ResponsiveContainer>` for responsive sizing

### Component Structure
```
src/Components/DebtVsInvesting/
├── DebtVsInvestingCalculator.jsx  # Main container, manages state
├── DebtVsInvestingCalculator.css  # All styles for the feature
├── InputForm.jsx                   # User input fields
├── ComparisonChart.jsx             # Recharts visualization
├── ResultsSummary.jsx              # Final comparison display
└── calculations.js                 # Pure calculation functions
```

### State Management
- Used React's built-in `useState` + `useEffect` - no external state library needed
- Calculations recalculate on every input change via useEffect dependency array
- State lives in parent component, passed down as props

### Calculation Logic
- **Scenario A (Pay Debt First)**: Full monthly payment to debt until paid off, then invest
- **Scenario B (Invest Instead)**: Pay interest-only on debt, invest the remaining budget
- Net Worth = Investment Balance - Remaining Debt
- Data points recorded yearly for chart display

## Patterns Used

### Input Fields with Currency/Percentage Prefixes
```jsx
<div className="input-with-prefix">
  <span className="prefix">$</span>
  <input type="number" ... />
</div>
```

### Responsive Layout
- Flexbox with `gap` for spacing
- Media query at 768px switches from row to column layout

### Currency Formatting
```js
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
}).format(amount);
```

## Commands

```bash
npm start    # Development server on localhost:3000
npm run build  # Production build
npm test     # Run tests
```

## Dependencies

- react: ^19.2.3
- recharts: ^3.7.0 (charting)
