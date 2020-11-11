import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';
import userEvent from '@testing-library/user-event';

const contactInfo = {
    first: "John",
    last: "Smith",
    email: "jsmith@gmail.com",
    password: "jsmith1234",
    confirmedPass: "jsmith1234"
};

const fillFormWithUnmatchedPassword = () => {
    userEvent.type(screen.getByLabelText('First'), contactInfo.first);
    userEvent.type(screen.getByLabelText('Last'), contactInfo.last);
    userEvent.type(screen.getByLabelText('Email'), contactInfo.email);
    userEvent.type(screen.getByLabelText('Password'), contactInfo.password);
    userEvent.type(screen.getByLabelText('Confirm Password'), "unmatchedPassword");
};

let formInputs;
beforeEach(() => {
    render(<ContactForm contactInfo={contactInfo} onChange={() => jest.fn()}/>);

    formInputs = {
        first: screen.getByLabelText('First'),
        last: screen.getByLabelText('Last'),
        email: screen.getByLabelText('Email'),
        password: screen.getByLabelText('Password'),
        confirmedPass: screen.getByLabelText('Confirm Password')
    };
});

test("All input fields of form are displayed", () => {
    expect(formInputs.first).toBeInTheDocument();
    expect(formInputs.last).toBeInTheDocument();
    expect(formInputs.email).toBeInTheDocument();
    expect(formInputs.password).toBeInTheDocument();
    expect(formInputs.confirmedPass).toBeInTheDocument();
})

test('If user types in mismatched confirmed password, the field is highlighted with error displayed', () => {
    fillFormWithUnmatchedPassword();

    expect(formInputs.confirmedPass).toHaveClass('input-error');
    expect(screen.getByText('Password mismatch')).toBeInTheDocument();
});