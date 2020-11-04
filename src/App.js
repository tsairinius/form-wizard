import logo from './logo.svg';
import Wizard from './components/Wizard';
import StyledContainer from './components/StyledContainer';
import './App.css';

function App() {
  return (
    <StyledContainer>
      <Wizard title="Signup" stepLabels={['Cat', 'Dog', 'Mouse']}> 
        <div>Cat</div>
        <div>Dog</div>
        <div>Mouse</div>
      </Wizard>
    </StyledContainer>
  );
}

export default App;
