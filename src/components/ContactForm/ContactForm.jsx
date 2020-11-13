import React from 'react';
import './ContactForm.css';

const ContactForm = ({onChange, contactInfo, formErrors}) => {
    const displayError = () => {
        let errorToDisplay;
        const firstError = Object.keys(formErrors).find(key => formErrors[key] === true);
        if (firstError === "email") {
            errorToDisplay = "Invalid email";
        }
        else if (firstError === "password") {
            errorToDisplay = "Password mismatch";
        }
    
        return (
            <div className="error-messages">
                {errorToDisplay ? <p>{errorToDisplay}</p> : null}
            </div>
        )
    }
    
    return (
        <div>
            <p className="user-instructions">Please fill out all fields below</p>
            <form data-testid="contact-form" className="contact-form">
                <label htmlFor="first">First</label>
                <input type="text" id="first" name="first" value={contactInfo.first} onChange={onChange}/>
                <label htmlFor="last">Last</label>
                <input type="text" id="last" name="last" value={contactInfo.last} onChange={onChange}/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={contactInfo.email} onChange={onChange} className={formErrors.email ? 'input-error' : null}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={contactInfo.password} onChange={onChange} className={formErrors.password ? 'input-error' : null}/>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" id="confirmPass" name="confirmPass" value={contactInfo.confirmPass} onChange={onChange} className={formErrors.password ? 'input-error' : null}/>
            </form>
            {displayError()}
        </div>
    )
}

export default ContactForm;