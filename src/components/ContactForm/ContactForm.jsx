import React from 'react';
import './ContactForm.css';

const ContactForm = ({onChange, contactInfo}) => {
    return (
        <form className="contact-form">
            <label htmlFor="first">First</label>
            <input type="text" id="first" name="first" value={contactInfo.first} onChange={onChange}/>
            <label htmlFor="last">Last</label>
            <input type="text" id="last" name="last" value={contactInfo.last} onChange={onChange}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={contactInfo.email} onChange={onChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={contactInfo.password} onChange={onChange}/>
            <label htmlFor="confirmPass">Confirm Password</label>
            <input type="password" id="confirmPass" name="confirmPass" value={contactInfo.confirmPass} onChange={onChange}/>
        </form>
    )
}

export default ContactForm;