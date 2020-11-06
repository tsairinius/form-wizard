import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


describe("Testing contact form step", () => {
  const contactInfo = {
    first: "John",
    last: "Smith",
    email: "jsmith@gmail.com",
    password: "jsmith1234",
    confirmedPass: "jsmith1234"
  }
  
  const fillInputFields = () => {
    userEvent.type(screen.getByLabelText('First'), contactInfo.first);
    userEvent.type(screen.getByLabelText('Last'), contactInfo.last);
    userEvent.type(screen.getByLabelText('Email'), contactInfo.email);
    userEvent.type(screen.getByLabelText('Password'), contactInfo.password);
    userEvent.type(screen.getByLabelText('Confirm Password'), contactInfo.confirmedPass);
  }

  beforeEach(() => {
    render(<App />);
  })
  
  test('Next button is disabled by default', () => {
    expect(screen.getByRole('button', {name: 'Next'})).toHaveAttribute('disabled');
  });
  
  test('Disable Next if all fields are filled, but password and confirmed password do not match', () => {
    fillInputFields(); 
    userEvent.type(screen.getByLabelText('Confirm Password'), "unmatchedPassword");

    expect(screen.getByRole('button', {name: 'Next'})).toHaveAttribute('disabled');
  })
  
  test('Next button is enabled once all fields are filled and password is confirmed', () => {
    fillInputFields();
  
    expect(screen.getByRole('button', {name: 'Next'})).not.toHaveAttribute('disabled');
  });
})

