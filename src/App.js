
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DebtVsInvestingCalculator from './Components/DebtVsInvesting/DebtVsInvestingCalculator';

function App() {
  return (
    <div className="App">
      <Header />
      <DebtVsInvestingCalculator />
      <Footer />
    </div>
  );
}

export default App;
