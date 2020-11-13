import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

const contactInfo = {
    first: "John",
    last: "Smith",
    email: "jsmith@gmail.com",
    password: "jsmith1234",
    confirmedPass: "jsmith1234"
};

test("All input fields of form are displayed", () => {
    render(<ContactForm contactInfo={contactInfo} formErrors={{email: false, password: false}} onChange={() => jest.fn()}/>);

    expect(screen.getByLabelText('First')).toBeInTheDocument();
    expect(screen.getByLabelText('Last')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
})

describe("Form validation tests", () => {
    test('Invalid email field is highlighted with error displayed', () => {
        const invalidEmail = {email: true, password: false}
        render(<ContactForm contactInfo={contactInfo} formErrors={invalidEmail} onChange={() => jest.fn()}/>);
        expect(screen.getByLabelText("Email")).toHaveClass('input-error');
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    test('Mismatched passwords causes both password fields to be highlighted with error displayed', () => {
        const invalidPassword = {email: false, password: true}
        render(<ContactForm contactInfo={contactInfo} formErrors={invalidPassword} onChange={() => jest.fn()}/>);
        expect(screen.getByLabelText("Password")).toHaveClass('input-error');
        expect(screen.getByLabelText("Confirm Password")).toHaveClass('input-error');
        expect(screen.getByText('Password mismatch')).toBeInTheDocument();
    });

    test('When multiple inputs are invalid, first one in formErrors object takes precedence', () => {
        const multipleInvalid = {email: true, password: true}
        render(<ContactForm contactInfo={contactInfo} formErrors={multipleInvalid} onChange={() => jest.fn()}/>);
        expect(screen.getByLabelText("Email")).toHaveClass('input-error');
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
    })
})

