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
  const [ isPasswordMatched, setIsPasswordMatched ] = useState(true);
  const [ canProgress, setCanProgress ] = useState(true);
  const [ currentStep, setCurrentStep ] = useState(0);

  const [availability, setAvailability ] = useState([]);

  const saveAvailability = (updatedAvail) => {
    setAvailability(updatedAvail);
  }

  const handleChange = event => {
      const property = event.target.name;
      const value = event.target.value;

      setContactInfo({
          ...contactInfo,
          [property]: value
      })
  }

  useEffect(() => {
    switch(currentStep) {
      case 0: 
        const isContactFormValid = validateContactForm();
        setCanProgress(isContactFormValid);
        break;

      case 1: 
        setCanProgress(availability.length > 0);
        break;

      default:
        break;
    }
  }, [contactInfo, availability, currentStep])

  const getCurrentStep = currentStep => setCurrentStep(currentStep);

  const isContactInfoComplete = () => {
    return !Object.values(contactInfo).some(value => value === "");
  }

  const validateContactForm = () => {
    let isValid = true;
    if (!isContactInfoComplete()) {
      isValid = false;
    }
    if (!checkAndSetIsPasswordMatched()) {
      isValid = false;
    }

    return isValid;
  }

  const checkAndSetIsPasswordMatched = () => {
    let isMatched = false;
    if (contactInfo.password === contactInfo.confirmPass) {
      isMatched = true;
    }

    setIsPasswordMatched(isMatched);
    return isMatched;
  }

  return (
    <StyledContainer>
      <Wizard canProgress={canProgress} onStepChange={getCurrentStep} title="Signup" stepLabels={['Contact information', 'Availability']}> 
        <ContactForm onChange={handleChange} contactInfo={contactInfo} isPasswordMatched={isPasswordMatched}/> 
        <UserAvailability onChange={saveAvailability}/>
      </Wizard>
    </StyledContainer>
  );
}

export default App;
