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

const timeBlockId = "51";
const formCompleteMessage = "You completed the demo!";
const formCancelMessage = "You exited the demo!";

const fillFormWithUnmatchedPassword = () => {
  const confirmPassword = screen.getByLabelText('Confirm Password');
  fillContactForm();
  userEvent.clear(confirmPassword);
  userEvent.type(confirmPassword, "unmatchedPassword");
}

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
    fillFormWithUnmatchedPassword();

    expect(screen.getByRole('button', {name: 'Next'})).toHaveAttribute('disabled');
  });

  test('If user types in mismatched confirmed password, the field is highlighted with error displayed', () => {
    fillFormWithUnmatchedPassword();

    expect(screen.getByLabelText('Confirm Password')).toHaveClass('input-error');
    expect(screen.getByText('Password mismatch')).toBeInTheDocument();
  });
  
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
    userEvent.click(screen.getByTestId(timeBlockId));
    expect(screen.getByRole('button', {name: 'Submit'})).not.toHaveAttribute('disabled');
  })
});

describe("Testing cancel and submit behaviors of form wizard", () => {
  test("Clicking Submit button will display appropriate message", () => {
    render(<App />);
    fillContactForm();
    userEvent.click(screen.getByRole('button', {name: 'Next'}));
    userEvent.click(screen.getByTestId(timeBlockId));
    userEvent.click(screen.getByRole("button", {name: "Submit"}));

    expect(screen.getByText(formCompleteMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Return to form"})).toBeInTheDocument();
  });

  test("Clicking Cancel button will display appropriate message", () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", {name: "Cancel"}));

    expect(screen.getByText(formCancelMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Return to form"})).toBeInTheDocument();
  });
})

