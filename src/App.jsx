import React, { useEffect, useState } from 'react';
import useContactInfo from './hooks/useContactInfo';
import ContactForm from './components/ContactForm';
import UserAvailability from './components/UserAvailability';
import StyledContainer from './components/StyledContainer';
import Wizard from './components/Wizard';
import Message from './components/Message';
import './App.css';
import useAvailability from './hooks/useAvailability';

function App() {
  const { contactInfo,
          updateContactInfo, 
          formErrors,
          checkForValidForm,
          clearForm
        } = useContactInfo();

  const { availability,
          updateAvailability,
          clearAvailability
        } = useAvailability();

  const [ canProgress, setCanProgress ] = useState(true);
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ showMessage, setShowMessage ] = useState({shouldShow: false, message: ""});

  useEffect(() => {
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

  const returnToForm = () => {
    clearForm();
    clearAvailability();
    setShowMessage({shouldShow: false, message: ""});
  }

  const submitForm = () => setShowMessage({shouldShow: true, message: "You completed the demo!"});

  const cancelForm = () => setShowMessage({shouldShow: true, message: "You exited the demo!"});

  const getCurrentStep = currentStep => setCurrentStep(currentStep);

  return (
    <div className="form-wizard-app">
      {showMessage.shouldShow ? 
      <Message text={showMessage.message} onSubmit={returnToForm}/>
      :
      <StyledContainer className={"wizard-container"}>
        <Wizard canProgress={canProgress} onCancel={cancelForm} onSubmit={submitForm} onStepChange={getCurrentStep} title="Signup" stepLabels={["Contact info", "Availability"]}> 
          <ContactForm onChange={updateContactInfo} contactInfo={contactInfo} formErrors={formErrors}/> 
          <div>
            <p className={"user-instructions"}>Please provide your availability below</p>
            <UserAvailability availability={availability} onChange={updateAvailability}/>
          </div>
        </Wizard>
      </StyledContainer>}
    </div>
  );
}

export default App;
