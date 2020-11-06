import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const contactInfo = {
  first: "John",
  last: "Smith",
  email: "jsmith@gmail.com",
  password: "jsmith1234",
  confirmedPass: "jsmith1234"
};

const fillContactForm = () => {
  userEvent.type(screen.getByLabelText('First'), contactInfo.first);
  userEvent.type(screen.getByLabelText('Last'), contactInfo.last);
  userEvent.type(screen.getByLabelText('Email'), contactInfo.email);
  userEvent.type(screen.getByLabelText('Password'), contactInfo.password);
  userEvent.type(screen.getByLabelText('Confirm Password'), contactInfo.confirmedPass);
};

describe("Testing contact form step", () => {
  beforeEach(() => {
    render(<App />);
  })
  
  test('Next button is disabled by default', () => {
    expect(screen.getByRole('button', {name: 'Next'})).toHaveAttribute('disabled');
  });
  
  test('Disable Next if all fields are filled, but password and confirmed password do not match', () => {
    fillContactForm(); 
    userEvent.type(screen.getByLabelText('Confirm Password'), "unmatchedPassword");

    expect(screen.getByRole('button', {name: 'Next'})).toHaveAttribute('disabled');
  })
  
  test('Next button is enabled once all fields are filled and password is confirmed', () => {
    fillContactForm();
  
    expect(screen.getByRole('button', {name: 'Next'})).not.toHaveAttribute('disabled');
  });
})

describe('Testing user availability step', () => {
  beforeEach(() => {
    render(<App />);
    fillContactForm();
    userEvent.click(screen.getByRole('button', {name: 'Next'}));
  })

  test('Submit button is disabled when availability table is empty', () => {
    expect(screen.getByRole('button', {name: 'Submit'})).toHaveAttribute('disabled');
  }); 

  test('Submit button is enabled once availability table has selected time blocks', () => {
    userEvent.click(screen.getByTestId('51'));
    expect(screen.getByRole('button', {name: 'Submit'})).not.toHaveAttribute('disabled');
  })
});

