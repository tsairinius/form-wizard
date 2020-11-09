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

  useEffect(() => {
    updateIsPasswordMatched();
    updateCanProgress();
  }, [contactInfo, availability, currentStep]);

  const updateCanProgress = () => {
    switch(currentStep) {
      case 0: 
        const isContactFormValid = checkForValidForm();
        setCanProgress(isContactFormValid);
        break;

      case 1: 
        setCanProgress(availability.length > 0);
        break;

      default:
        break;
    }
  }

  const updateAvailability = (updatedAvail) => {
    setAvailability(updatedAvail);
  }

  const updateContactInfo = event => {
      const property = event.target.name;
      const value = event.target.value;

      setContactInfo({
          ...contactInfo,
          [property]: value
      })
  }

  const updateIsPasswordMatched = () => {
    const isMatched = checkForPasswordMatch();

    setIsPasswordMatched(isMatched);
  }

  const checkForCompleteForm = () => {
    return !Object.values(contactInfo).some(value => value === "");
  }

  const checkForValidForm = () => {
    let isValid = true;
    if (!checkForCompleteForm() || !checkForPasswordMatch()) {
      isValid = false;
    }

    return isValid;
  }

  const checkForPasswordMatch = () => {
    let isMatched = false;
    if (contactInfo.password === contactInfo.confirmPass) {
      isMatched = true;
    }

    return isMatched;
  }

  const getCurrentStep = currentStep => setCurrentStep(currentStep);

  return (
    <StyledContainer>
      <Wizard canProgress={canProgress} onStepChange={getCurrentStep} title="Signup" stepLabels={['Contact information', 'Availability']}> 
        <ContactForm onChange={updateContactInfo} contactInfo={contactInfo} isPasswordMatched={isPasswordMatched}/> 
        <div>
          <p className={"user-instructions"}>Please provide your availability below</p>
          <UserAvailability onChange={updateAvailability}/>
        </div>
      </Wizard>
    </StyledContainer>
  );
}

export default App;
