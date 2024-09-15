import { Button } from "@/components/ui/button";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";

function TestingButton() {
  const [text, setText] = useState("Click me");
  return <Button onClick={() => setText("Clicked!")}>{text}</Button>;
}

describe("Button component", () => {
  test("renders the button with initial label", () => {
    // Render the Button component
    const buttonComponent = render(<Button>Click me</Button>);
    expect(buttonComponent).toMatchSnapshot();
  });

  test('changes label to "Clicked!" when clicked', () => {
    // Render the Button component
    render(<TestingButton />);

    // Find the button by its initial text
    const buttonElement = screen.getByText("Click me");

    // Simulate a click event
    fireEvent.click(buttonElement);

    // Expect the label to have changed
    expect(buttonElement).toHaveTextContent("Clicked!");
  });
});
