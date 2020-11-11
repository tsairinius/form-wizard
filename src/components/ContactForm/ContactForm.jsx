import React from 'react';
import './ContactForm.css';

const ContactForm = ({onChange, contactInfo, isPasswordMatched}) => {
    return (
        <div>
            <p className="user-instructions">Please fill out all fields below</p>
            <form data-testid="contact-form" className="contact-form">
                <label htmlFor="first">First</label>
                <input type="text" id="first" name="first" value={contactInfo.first} onChange={onChange}/>
                <label htmlFor="last">Last</label>
                <input type="text" id="last" name="last" value={contactInfo.last} onChange={onChange}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={contactInfo.email} onChange={onChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={contactInfo.password} onChange={onChange} className={!isPasswordMatched ? 'input-error' : undefined}/>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" id="confirmPass" name="confirmPass" value={contactInfo.confirmPass} onChange={onChange} className={!isPasswordMatched ? 'input-error' : undefined}/>
            </form>
            <div className="error-messages">
                {!isPasswordMatched ? <p>Password mismatch</p> : undefined}
            </div>
        </div>
    )
}

export default ContactForm;