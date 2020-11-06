import React from 'react';
import { render } from '@testing-library/react';
import ContactForm from './ContactForm';


test('render', () => {
    const contactInfo = {
        first: "John",
        last: "Smith",
        email: "jsmith@gmail.com",
        password: "jsmith1234",
        confirmedPass: "jsmith1234"
    }

    const handleChange = jest.fn();

    render(<ContactForm contactInfo={contactInfo} onChange={handleChange}/>);
});