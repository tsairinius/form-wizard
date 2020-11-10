import React, { useEffect, useState } from 'react';
import useContactInfo from './hooks/useContactInfo';
import ContactForm from './components/ContactForm';
import UserAvailability from './components/UserAvailability';
import StyledContainer from './components/StyledContainer';
import Wizard from './components/Wizard';
import './App.css';
import Message from './components/Message';

function App() {
  const { contactInfo,
          updateContactInfo, 
          isPasswordMatched,
          updateIsPasswordMatched,
          checkForValidForm,
          clearForm
        } = useContactInfo();

  const [ availability, setAvailability ] = useState([]);
  const [ canProgress, setCanProgress ] = useState(true);
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ showMessage, setShowMessage ] = useState({shouldShow: false, message: ""});

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

  const getCurrentStep = currentStep => setCurrentStep(currentStep);

  const returnToForm = () => {
    setShowMessage({shouldShow: false, message: ""});
  }

  const submitForm = () => {
    setShowMessage({shouldShow: true, message: "You completed the demo!"});
    clearForm();
  };

  const cancelForm = () => {
    setShowMessage({shouldShow: true, message: "You exited the demo!"});
    clearForm();
  }

  return (
    <div className="form-wizard-app">
      {showMessage.shouldShow ? 
      <Message text={showMessage.message} onSubmit={returnToForm}/>
      :
      <StyledContainer className={"wizard-container"}>
        <Wizard canProgress={canProgress} onCancel={cancelForm} onSubmit={submitForm} onStepChange={getCurrentStep} title="Signup" stepLabels={['Contact information', 'Availability']}> 
          <ContactForm onChange={updateContactInfo} contactInfo={contactInfo} isPasswordMatched={isPasswordMatched}/> 
          <div>
            <p className={"user-instructions"}>Please provide your availability below</p>
            <UserAvailability onChange={updateAvailability}/>
          </div>
        </Wizard>
      </StyledContainer>}
    </div>
  );
}

export default App;
