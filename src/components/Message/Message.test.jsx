import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Message from "./Message";

test("Displays text passed in as prop", () => {
    render(<Message text={"Hello"} onSubmit={() => jest.fn()}/>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
});

test("Displays button to return to form", () => {
    render(<Message text={"Hello"} onSubmit={() => jest.fn()}/>);
    expect(screen.getByRole("button", {name: "Return to form"})).toBeInTheDocument();
});

test("Clicking 'return-to-form' button invokes appropriate callback", () => {
    const handleSubmit = jest.fn();
    render(<Message text={"Hello"} onSubmit={handleSubmit}/>);

    userEvent.click(screen.getByRole("button", {name: "Return to form"}));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
});