import React, { useEffect, useState } from 'react';
import Wizard from './components/Wizard';
import StyledContainer from './components/StyledContainer';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import UserAvailability from './components/UserAvailability';

function App() {
  const initialInfo = {
    first: "",
    last: "",
    email: "",
    password: "",
    confirmPass: ""
  }

  const [ contactInfo, setContactInfo ] = useState(initialInfo);
  const [ canProgress, setCanProgress ] = useState(true);
  const [ currentStep, setCurrentStep ] = useState(0);

  const handleChange = event => {
      const property = event.target.name;
      const value = event.target.value;

      setContactInfo({
          ...contactInfo,
          [property]: value
      })
  }

  useEffect(() => {
    if (currentStep === 0) {
      setCanProgress(isContactInfoComplete() && isPasswordConfirmed());
    }
  }, [contactInfo, currentStep])

  const getCurrentStep = currentStep => setCurrentStep(currentStep);

  const isContactInfoComplete = () => {
    return !Object.values(contactInfo).some(value => value === "");
  }

  const isPasswordConfirmed = () => {
    return contactInfo.password === contactInfo.confirmPass;
  }

  return (
    <StyledContainer>
      <Wizard canProgress={canProgress} onStepChange={getCurrentStep} title="Signup" stepLabels={['Contact information', 'Dog', 'Mouse']}> 
        <ContactForm onChange={handleChange} contactInfo={contactInfo}/> 
        <UserAvailability title={"Your availability"}/>
      </Wizard>
    </StyledContainer>
  );
}

export default App;