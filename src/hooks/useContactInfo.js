import { useState } from "react";

const useContactInfo = () => {
    const initialInfo = {
        first: "",
        last: "",
        email: "",
        password: "",
        confirmPass: ""
      }
    
    const [ contactInfo, setContactInfo ] = useState(initialInfo);
    const [ isPasswordMatched, setIsPasswordMatched ] = useState(true);

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

    const clearForm = () => {
      setContactInfo(initialInfo);
    }

    return {
        contactInfo,
        updateContactInfo, 
        isPasswordMatched,
        updateIsPasswordMatched,
        checkForValidForm,
        clearForm
    }
}

export default useContactInfo;


