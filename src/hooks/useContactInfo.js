import { useEffect, useState } from "react";

const useContactInfo = () => {
    const initialInfo = {
      first: "",
      last: "",
      email: "",
      password: "",
      confirmPass: ""
      }

    const initialErrors = {
      email: false,
      password: false
    }
    
    const [ contactInfo, setContactInfo ] = useState(initialInfo);
    const [ formErrors, setFormErrors ] = useState(initialErrors);

    useEffect(() => {
      updateFormErrors();

    }, [contactInfo])

    const updateContactInfo = event => {
        const property = event.target.name;
        const value = event.target.value;
  
        setContactInfo({
            ...contactInfo,
            [property]: value
        })
    }

    const updateFormErrors = () => {
      setFormErrors({
        email: !checkForValidEmail(),
        password: !checkForPasswordMatch()
      })
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

    const checkForValidEmail = () => {
      const emailFormat = /@\w{1,}\.\w{1,}/;
      return (emailFormat.test(contactInfo.email) || contactInfo.email === "");
    }

    const clearForm = () => {
      setContactInfo(initialInfo);
    }

    return {
        contactInfo,
        updateContactInfo, 
        formErrors,
        checkForValidForm,
        clearForm
    }
}

export default useContactInfo;


