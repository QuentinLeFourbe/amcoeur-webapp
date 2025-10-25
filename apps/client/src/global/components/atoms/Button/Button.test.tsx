import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Button from "./Button";

describe("Button component styles", () => {
  it("should render the button with the correct text", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should have bold font weight when the bold prop is true", () => {
    render(<Button bold>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("font_bold");
  });

  it("should have border-radius of 32px when the rounded prop is true", () => {
    render(<Button rounded>Click me</Button>);
    const button = screen.getByRole("button");
    const computedStyle = window.getComputedStyle(button);
    console.log({ computedStyle });
    console.log({borderRadius: computedStyle.borderRadius})
    expect(computedStyle.borderRadius).toBe("32px");
    expect(button).toHaveClass("rounded_32px");
  });

  it("should have both bold and rounded styles when both props are true", () => {
    render(
      <Button bold rounded>
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");
    screen.debug();
    expect(button).toHaveClass("font_bold");
    expect(button).toHaveClass("rounded_32px");
  });

  it("should have default styles when no props are provided", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("font_bold");
    expect(button).not.toHaveClass("rounded_32px");
  });
});
