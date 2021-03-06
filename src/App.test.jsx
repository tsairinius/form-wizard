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

const fillFormWithInvalidEmail = () => {
  const emailInput = screen.getByLabelText("Email");
  fillContactForm();
  userEvent.clear(emailInput);
  userEvent.type(emailInput, "invalidEmail");
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

  test('Disable Next if form is filled out but email is invalid', () => {
    fillFormWithInvalidEmail();

    expect(screen.getByRole("button", {name: "Next"})).toHaveAttribute("disabled");
  });
  
  test('Next button is enabled once all fields are filled and password is confirmed', () => {
    fillContactForm();
  
    expect(screen.getByRole('button', {name: 'Next'})).not.toHaveAttribute('disabled');
  });

  test('If user types in mismatched confirmed password, both password fields are highlighted with error displayed', () => {
    fillFormWithUnmatchedPassword();

    expect(screen.getByLabelText("Password")).toHaveClass('input-error');
    expect(screen.getByLabelText("Confirm Password")).toHaveClass('input-error');
    expect(screen.getByText('Password mismatch')).toBeInTheDocument();
  });

  test('If user types in email with no @ symbol, the field is highlighted with error displayed', () => {
    userEvent.type(screen.getByLabelText("Email"), "invalidEmail.com");
    expect(screen.getByLabelText("Email")).toHaveClass('input-error');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  test('If user types in email with no period, the field is highlighted with error displayed', () => {
    userEvent.type(screen.getByLabelText("Email"), "invalid@Email");
    expect(screen.getByLabelText("Email")).toHaveClass('input-error');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  test('If user types in email with no letters/numbers between @ and period, the field is highlighted with error displayed', () => {
    userEvent.type(screen.getByLabelText("Email"), "invalid@.com");
    expect(screen.getByLabelText("Email")).toHaveClass('input-error');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
})

describe('Testing user availability step', () => {
  const timeBlockId = '02';
  const isActiveClass = 'is-active';
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

  test("time block acquires is-active class when clicked on", () => {
      expect(screen.getByTestId(timeBlockId)).not.toHaveClass(isActiveClass);
  
      userEvent.click(screen.getByTestId(timeBlockId))
  
      expect(screen.getByTestId(timeBlockId)).toHaveClass(isActiveClass);
  })

  test("time block should not have is-active class when clicked on twice in a row", () => {
      userEvent.click(screen.getByTestId(timeBlockId));
      userEvent.click(screen.getByTestId(timeBlockId));

      expect(screen.getByTestId(timeBlockId)).not.toHaveClass(isActiveClass);
  })
});

describe("Testing cancel and submit behaviors of form wizard", () => {
  const fillAndSubmitForm = () => {
    fillContactForm();
    userEvent.click(screen.getByRole('button', {name: 'Next'}));
    userEvent.click(screen.getByTestId(timeBlockId));
    userEvent.click(screen.getByRole("button", {name: "Submit"}));
  };

  const expectClearedForm = () => {
    expect(screen.getByTestId("contact-form")).toHaveFormValues({
      first: "",
      last: "",
      email: "",
      password: "",
      confirmPass: ""
    });
  };

  beforeEach(() => {
    render(<App />);
  })

  test("Clicking Submit button will display appropriate message", () => {
    fillAndSubmitForm();

    expect(screen.getByText(formCompleteMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Return to form"})).toBeInTheDocument();
  });

  test("Clicking Cancel button will display appropriate message", () => {
    userEvent.click(screen.getByRole("button", {name: "Cancel"}));

    expect(screen.getByText(formCancelMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Return to form"})).toBeInTheDocument();
  });

  test("Clicking Submit followed by return-to-form button takes user to a cleared form", () => {
    fillAndSubmitForm();
    userEvent.click(screen.getByRole("button", {name: "Return to form"}));

    expectClearedForm();
  });

  test("Clicking Cancel followed by return-to-form button takes user to a cleared form", () => {
    userEvent.click(screen.getByRole("button", {name: "Cancel"}));
    userEvent.click(screen.getByRole("button", {name: "Return to form"}));

    expectClearedForm();
  })

  test("Clicking Submit followed by return-to-form button should clear user availability", () => {
    fillAndSubmitForm();
    userEvent.click(screen.getByRole("button", {name: "Return to form"}));
    fillContactForm();
    userEvent.click(screen.getByRole("button", {name: "Next"}));
    expect(document.querySelectorAll(".is-active").length).toBe(0);
  })

  test("Clicking Cancel followed by return-to-form button should clear user availability", () => {
    userEvent.click(screen.getByRole("button", {name: "Cancel"}));
    userEvent.click(screen.getByRole("button", {name: "Return to form"}));
    fillContactForm();
    userEvent.click(screen.getByRole("button", {name: "Next"}));
    expect(document.querySelectorAll(".is-active").length).toBe(0);
  })
})

